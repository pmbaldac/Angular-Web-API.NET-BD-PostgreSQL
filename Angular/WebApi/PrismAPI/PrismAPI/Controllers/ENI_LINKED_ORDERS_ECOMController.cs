using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Web.Http;
using PrismAPI.Models;
using Oracle.ManagedDataAccess.Client;
using static System.Net.Mime.MediaTypeNames;
using System.Text.RegularExpressions;
using System.Diagnostics;

namespace PrismAPI.Controllers
{
    public class ENI_LINKED_ORDERS_ECOMController : ApiController
    {
        private readonly string ConnectionDB;

        public ENI_LINKED_ORDERS_ECOMController()
        {
            ConnectionDB = ConfigurationManager.ConnectionStrings["OracleConn"].ToString();
        }
        public IHttpActionResult Get()
        {
            
            List<ENI_LINKED_ORDERS_ECOM> lEComerce = new List<ENI_LINKED_ORDERS_ECOM>();
            OracleConnection conex = new OracleConnection(ConnectionDB);
            try
            {
                StringBuilder sbQuery = new StringBuilder();
                sbQuery.Append("SELECT ECOMMNAME, ECOMMID, ORDERNUM, ORDERAMT, ORDERDATE, ORDERCUST, CREATEDDATERP, RPROSID, DOCNORP, FISCALDOCNO, NUMTRIES, ERRORMSG ");
                sbQuery.Append("FROM RPS.ENI_LINKED_ORDERS_ECOM");

                using (OracleCommand cmd = new OracleCommand(sbQuery.ToString(), conex))
                {
                    conex.Open();
                    cmd.CommandType = CommandType.Text;
                    OracleDataReader oReader = cmd.ExecuteReader();

                    while (oReader.Read())
                    {
                        lEComerce.Add(new ENI_LINKED_ORDERS_ECOM()
                        {
                            ECOMMNAME = oReader["ECOMMNAME"].ToString(),
                            ECOMMID = Convert.ToInt64(oReader["ECOMMID"]),
                            ORDERNUM = Convert.ToInt32(oReader["ORDERNUM"]),
                            ORDERAMT = Convert.ToInt32(oReader["ORDERAMT"]),
                            ORDERDATE = Convert.ToDateTime(oReader["ORDERDATE"]),
                            ORDERCUST = oReader["ORDERCUST"].ToString(),
                            CREATEDDATERP = Convert.ToDateTime(oReader["CREATEDDATERP"]),
                            RPROSID = oReader["RPROSID"].ToString(),
                            DOCNORP = Convert.ToInt32(oReader["DOCNORP"]),
                            FISCALDOCNO = Convert.ToInt32(oReader["FISCALDOCNO"]),
                            NUMTRIES = Convert.ToInt32(oReader["NUMTRIES"]),
                            ERRORMSG = oReader["ERRORMSG"].ToString()
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

        public IHttpActionResult Get(string sEcommName, string sOrderCust, int iPage, int iCantReg)
        {

            List<ENI_LINKED_ORDERS_ECOM> lEComerce = new List<ENI_LINKED_ORDERS_ECOM>();
            OracleConnection conex = new OracleConnection(ConnectionDB);
            try
            {
                string sOrderCustTemp = sOrderCust.Replace("'", "");
                StringBuilder sbQuery = new StringBuilder();
                sbQuery.Append("SELECT ECOMMNAME, ECOMMID, ORDERNUM, ORDERAMT, ORDERDATE, ORDERCUST, CREATEDDATERP, RPROSID, DOCNORP, FISCALDOCNO, NUMTRIES, ERRORMSG ");
                sbQuery.Append("FROM RPS.ENI_LINKED_ORDERS_ECOM");
                sbQuery.Append(" WHERE UPPER(ECOMMNAME) = ");
                sbQuery.Append(sEcommName.ToUpper());
                if (!sOrderCustTemp.ToUpper().Equals(ConfigurationManager.AppSettings["Todas"]))
                {
                    sbQuery.Append(" AND UPPER(ORDERCUST) = ");
                    sbQuery.Append(sOrderCust.ToUpper());
                }
                sbQuery.Append(" ORDER BY ORDERDATE, ECOMMID DESC ");
                sbQuery.Append(" OFFSET ");
                sbQuery.Append(iPage);
                sbQuery.Append(" ROWS FETCH NEXT ");
                sbQuery.Append(iCantReg);
                sbQuery.Append(" ROWS ONLY");

                using (OracleCommand cmd = new OracleCommand(sbQuery.ToString(), conex))
                {
                    conex.Open();
                    cmd.CommandType = CommandType.Text;
                    OracleDataReader oReader = cmd.ExecuteReader();

                    while (oReader.Read())
                    {
                        lEComerce.Add(new ENI_LINKED_ORDERS_ECOM()
                        {
                            ECOMMNAME = oReader["ECOMMNAME"].ToString(),
                            ECOMMID = Convert.ToInt64(oReader["ECOMMID"]),
                            ORDERNUM = Convert.ToInt32(oReader["ORDERNUM"]),
                            ORDERAMT = Convert.ToInt32(oReader["ORDERAMT"]),
                            ORDERDATE = Convert.ToDateTime(oReader["ORDERDATE"]),
                            ORDERCUST = oReader["ORDERCUST"].ToString(),
                            CREATEDDATERP = Convert.ToDateTime(oReader["CREATEDDATERP"]),
                            RPROSID = oReader["RPROSID"].ToString(),
                            DOCNORP = Convert.ToInt32(oReader["DOCNORP"]),
                            FISCALDOCNO = Convert.ToInt32(oReader["FISCALDOCNO"]),
                            NUMTRIES = Convert.ToInt32(oReader["NUMTRIES"]),
                            ERRORMSG = oReader["ERRORMSG"].ToString()
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
