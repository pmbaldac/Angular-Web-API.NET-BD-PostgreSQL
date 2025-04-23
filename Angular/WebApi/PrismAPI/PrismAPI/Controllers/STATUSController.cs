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
    public class STATUSController : ApiController
    {
        private readonly string ConnectionDB;

        public STATUSController()
        {
            ConnectionDB = ConfigurationManager.ConnectionStrings["OracleConn"].ToString();
        }
        public IHttpActionResult Get()
        {

            List<STATUS> lStatus = new List<STATUS>();
            OracleConnection conex = new OracleConnection(ConnectionDB);
            try
            {
                StringBuilder sbQuery = new StringBuilder();
                sbQuery.Append("SELECT IDSTATUS, STATUS_NAME ");
                sbQuery.Append("FROM RPS.STATUS");

                using (OracleCommand cmd = new OracleCommand(sbQuery.ToString(), conex))
                {
                    conex.Open();
                    cmd.CommandType = CommandType.Text;
                    OracleDataReader oReader = cmd.ExecuteReader();

                    while (oReader.Read())
                    {
                        lStatus.Add(new STATUS()
                        {
                            IDSTATUS = Convert.ToInt64(oReader["IDSTATUS"]),
                            STATUS_NAME = oReader["STATUS_NAME"].ToString(),
                        });
                    }

                }
                return Ok(lStatus);
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
