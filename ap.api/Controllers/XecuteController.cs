using ap.api.Infra;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace ap.api.Controllers
{
    [Route("api/Xecute")]
    [ApiController]
    public class XecuteController : ControllerBase
    {
        private readonly XecuteService _xecuteService; 
        public XecuteController(XecuteService xecuteService)
        {
            _xecuteService = xecuteService;
        }
        [HttpPost("GetById")]
        public IActionResult GetById([FromBody] dynamic data)
        {
            var parameters = JsonConvert.DeserializeObject<Dictionary<string, object>>(data.ToString());

            var result = _xecuteService.Execute(parameters,"");
            return Ok(result.DynamicJson);
        }
    }
}
