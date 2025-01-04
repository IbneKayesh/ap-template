namespace ap.api.Models
{
    public class EQResult
    {
        public bool SUCCESS { get; set; } = true;
        public string MESSAGE { get; set; } = "OK";
        public int ROWS { get; set; } = 0;
        public dynamic DynamicData { get; set; } = "DynamicData";
        public string DynamicJson { get; set; } = "[]";
    }
}
