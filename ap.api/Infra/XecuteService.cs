using ap.api.DBC;
using ap.api.Models;

namespace ap.api.Infra
{
    public class XecuteService
    {
        private readonly RawSql _rawSql;
        public XecuteService(RawSql rawSql)
        {
            _rawSql = rawSql;
        }
        public EQResult Execute(Dictionary<string, object> parameters, string connection)
        {
            return _rawSql.ExecuteSqlSp(connection, "SP_BRANCH", parameters);
        }

    }
}
