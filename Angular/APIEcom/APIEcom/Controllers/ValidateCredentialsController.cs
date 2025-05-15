using System;
using System.Text;
using System.Data;
using System.Configuration;
using System.Web.Http;
using Npgsql;

namespace APIEcom.Controllers
{
    public class ValidateCredentialsController: ApiController
    {
        private readonly string ConnectionDB;

        public ValidateCredentialsController()
        {
            ConnectionDB = ConfigurationManager.ConnectionStrings["PostgresConn"].ToString();
        }
        public IHttpActionResult Get(string sUser, string sPass)
        {
            using (NpgsqlConnection conex = new NpgsqlConnection(ConnectionDB))
            {
                bool UserValid = false;
                try
                {
                    StringBuilder sbQuery = new StringBuilder();
                    sbQuery.Append("SELECT COUNT(*) ");
                    sbQuery.Append("FROM users ");
                    sbQuery.Append(" WHERE username = '");
                    sbQuery.Append(sUser);
                    sbQuery.Append("' AND password = '");
                    sbQuery.Append(sPass);
                    sbQuery.Append("' AND active = true ");

                    using (NpgsqlCommand cmd = new NpgsqlCommand(sbQuery.ToString(), conex))
                    {
                        conex.Open();
                        cmd.CommandType = CommandType.Text;
                        NpgsqlDataReader oReader = cmd.ExecuteReader();

                        while (oReader.Read())
                        {
                            if (oReader["count"].ToString().Trim().Equals("1"))
                            {
                                UserValid = true;
                            }
                        }

                    }
                    var response = new { UserValid = UserValid };
                    return Ok(response);
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