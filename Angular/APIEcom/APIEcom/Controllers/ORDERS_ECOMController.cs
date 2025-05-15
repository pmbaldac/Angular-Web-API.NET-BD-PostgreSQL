using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Text;
using System.Web.Http;
using APIEcom.Models;
using Npgsql;

namespace APIEcom.Controllers
{
    public class ORDERS_ECOMController: ApiController
    {
        private readonly string ConnectionDB;

        public ORDERS_ECOMController()
        {
            ConnectionDB = ConfigurationManager.ConnectionStrings["PostgresConn"].ToString();
        }
        public IHttpActionResult Get()
        {
            using (NpgsqlConnection conex = new NpgsqlConnection(ConnectionDB))
            {
                try
                {
                    List<ORDERS_ECOM> lEComerce = new List<ORDERS_ECOM>();
                    StringBuilder sbQuery = new StringBuilder();
                    sbQuery.Append("SELECT ecommname, ecommid, ordernum, orderamt, orderdate, ordercust, createddaterp, rprosid, docnorp, fiscaldocno, numtries, errormsg ");
                    sbQuery.Append("FROM orders_ecom");

                    using (NpgsqlCommand cmd = new NpgsqlCommand(sbQuery.ToString(), conex))
                    {
                        conex.Open();
                        cmd.CommandType = CommandType.Text;
                        NpgsqlDataReader oReader = cmd.ExecuteReader();

                        while (oReader.Read())
                        {
                            lEComerce.Add(new ORDERS_ECOM()
                            {
                                ECOMMNAME = oReader["ecommname"].ToString(),
                                ECOMMID = Convert.ToInt64(oReader["ecommid"]),
                                ORDERNUM = Convert.ToInt32(oReader["ordernum"]),
                                ORDERAMT = Convert.ToInt32(oReader["orderamt"]),
                                ORDERDATE = Convert.ToDateTime(oReader["orderdate"]),
                                ORDERCUST = oReader["ordercust"].ToString(),
                                CREATEDDATERP = Convert.ToDateTime(oReader["createddaterp"]),
                                RPROSID = oReader["rprosid"].ToString(),
                                DOCNORP = Convert.ToInt32(oReader["docnorp"]),
                                FISCALDOCNO = Convert.ToInt32(oReader["fiscaldocno"]),
                                NUMTRIES = Convert.ToInt32(oReader["numtries"]),
                                ERRORMSG = oReader["errormsg"].ToString()
                            });
                        }

                    }
                    return Ok(lEComerce);
                }
                catch (Exception ex)
                {
                    return Ok(ex);
                }
                finally
                {
                    conex.Close();
                }
            }
        }
    }
}