using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Web.Http;
using Oracle.ManagedDataAccess.Client;
using PrismAPI.Models;

namespace PrismAPI.Controllers
{
    public class ECOMMController : ApiController
    {
        private readonly string ConnectionDB;

        public ECOMMController()
        {
            ConnectionDB = ConfigurationManager.ConnectionStrings["OracleConn"].ToString();
        }
        public IHttpActionResult Get()
        {

            List<ECOMM> lEComm = new List<ECOMM>();
            OracleConnection conex = new OracleConnection(ConnectionDB);
            try
            {
                StringBuilder sbQuery = new StringBuilder();
                sbQuery.Append("SELECT IDECOMM, ECOMMNAME ");
                sbQuery.Append("FROM RPS.ECOMM");

                using (OracleCommand cmd = new OracleCommand(sbQuery.ToString(), conex))
                {
                    conex.Open();
                    cmd.CommandType = CommandType.Text;
                    OracleDataReader oReader = cmd.ExecuteReader();

                    while (oReader.Read())
                    {
                        lEComm.Add(new ECOMM()
                        {
                            IDECOMM = Convert.ToInt64(oReader["IDECOMM"]),
                            ECOMMNAME = oReader["ECOMMNAME"].ToString(),
                        });
                    }

                }
                return Ok(lEComm);
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
