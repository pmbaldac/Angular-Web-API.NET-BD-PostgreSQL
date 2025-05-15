using System;

namespace APIEcom.Models
{
    public class ORDERS_ECOM
    {
        public string ECOMMNAME { get; set; }
        public long ECOMMID { get; set; }
        public int ORDERNUM { get; set; }
        public int ORDERAMT { get; set; }
        public DateTime ORDERDATE { get; set; }
        public string ORDERCUST { get; set; }
        public DateTime CREATEDDATERP { get; set; }
        public string RPROSID { get; set; }
        public int DOCNORP { get; set; }
        public int FISCALDOCNO { get; set; }
        public int NUMTRIES { get; set; }
        public string ERRORMSG { get; set; }
    }
}