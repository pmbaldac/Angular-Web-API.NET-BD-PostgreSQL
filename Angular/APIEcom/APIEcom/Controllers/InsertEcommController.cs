using System;
using System.Text;
using System.Data;
using System.Configuration;
using System.Web.Http;
using APIEcom.Models;
using Npgsql;

namespace APIEcom.Controllers
{
    public class InsertEcommController: ApiController
    {
        private readonly string ConnectionDB;

        public InsertEcommController()
        {
            ConnectionDB = ConfigurationManager.ConnectionStrings["PostgresConn"].ToString();
        }
        public IHttpActionResult Post([FromBody] EcommRequest request)
        {
            using (NpgsqlConnection conex = new NpgsqlConnection(ConnectionDB))
            {
                try
                {
                    StringBuilder sbQuery = new StringBuilder();
                    sbQuery.Append("SELECT(ecommid + 1) as ecommid FROM orders_ecom ORDER BY ecommid DESC LIMIT 1");

                    using (NpgsqlCommand cmd = new NpgsqlCommand(sbQuery.ToString(), conex))
                    {
                        conex.Open();
                        int iEcommId = 0;
                        cmd.CommandType = CommandType.Text;
                        NpgsqlDataReader oReader = cmd.ExecuteReader();
                        while (oReader.Read())
                        {
                            iEcommId = Convert.ToInt32(oReader["ecommid"]);
                        }

                        if (iEcommId > 0)
                        {
                            int iCount = 0;
                            using (NpgsqlConnection conexConsult = new NpgsqlConnection(ConnectionDB))
                            {
                                StringBuilder sbQueryConsult = new StringBuilder();
                                sbQueryConsult.Append("SELECT COUNT(*) FROM ORDERS_ECOM WHERE UPPER(ECOMMNAME) = '");
                                sbQueryConsult.Append(request.EcommName.ToUpper());
                                sbQueryConsult.Append("'");
                                using (NpgsqlCommand cmdConsult = new NpgsqlCommand(sbQueryConsult.ToString(), conexConsult))
                                {
                                    conexConsult.Open();
                                    cmdConsult.CommandType = CommandType.Text;
                                    NpgsqlDataReader oReaderConsult = cmdConsult.ExecuteReader();
                                    while (oReaderConsult.Read())
                                    {
                                        iCount = Convert.ToInt32(oReaderConsult["count"]);
                                    }
                                }
                            }

                            if (iCount > 0)
                            {
                                var response = new { RowAffected = 0, Message = "Tienda ya existe" };
                                return Ok(response);
                            }
                            else
                            {
                                using (NpgsqlConnection conexInsert = new NpgsqlConnection(ConnectionDB))
                                {
                                    int iRowAffected = 0;
                                    StringBuilder sbQueryInsert = new StringBuilder();
                                    sbQueryInsert.Append("INSERT INTO ORDERS_ECOM(");
                                    sbQueryInsert.Append("ECOMMNAME, ECOMMID, ORDERNUM, ORDERAMT, ORDERDATE, ORDERCUST, CREATEDDATERP, RPROSID, DOCNORP, FISCALDOCNO, NUMTRIES, ERRORMSG) VALUES('");
                                    sbQueryInsert.Append(request.EcommName);
                                    sbQueryInsert.Append("', ");
                                    sbQueryInsert.Append(iEcommId.ToString());
                                    sbQueryInsert.Append(", ");
                                    sbQueryInsert.Append(iEcommId.ToString());
                                    sbQueryInsert.Append(", ");
                                    sbQueryInsert.Append(iEcommId.ToString());
                                    sbQueryInsert.Append(", '");
                                    sbQueryInsert.Append(DateTime.Now.Year);
                                    sbQueryInsert.Append("-");
                                    sbQueryInsert.Append(DateTime.Now.Month);
                                    sbQueryInsert.Append("-");
                                    sbQueryInsert.Append(DateTime.Now.Day);
                                    sbQueryInsert.Append("', '");
                                    sbQueryInsert.Append(request.Status);
                                    sbQueryInsert.Append("', '");
                                    sbQueryInsert.Append(DateTime.Now.Year);
                                    sbQueryInsert.Append("-");
                                    sbQueryInsert.Append(DateTime.Now.Month);
                                    sbQueryInsert.Append("-");
                                    sbQueryInsert.Append(DateTime.Now.Day);
                                    sbQueryInsert.Append("', ");
                                    sbQueryInsert.Append(iEcommId.ToString());
                                    sbQueryInsert.Append(", ");
                                    sbQueryInsert.Append(iEcommId.ToString());
                                    sbQueryInsert.Append(", ");
                                    sbQueryInsert.Append(iEcommId.ToString());
                                    sbQueryInsert.Append(",0, NULL)");

                                    using (NpgsqlCommand cmdInsert = new NpgsqlCommand(sbQueryInsert.ToString(), conexInsert))
                                    {
                                        conexInsert.Open();
                                        cmdInsert.CommandType = CommandType.Text;
                                        iRowAffected = cmdInsert.ExecuteNonQuery();
                                    }
                                    var response = new { RowAffected = iRowAffected, Message = "" };
                                    return Ok(response);
                                }
                            }
                        }
                        else
                        {
                            throw new Exception("Error al consultar la base de datos");
                        }
                    }

                }
                catch (Exception ex)
                {
                    return Ok(ex);
                }
            }
        }
    }
}