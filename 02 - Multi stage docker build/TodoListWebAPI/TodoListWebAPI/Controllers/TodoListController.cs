using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TodoListWebAPI.Models;
using TodoListWebAPI.Services;

namespace TodoListWebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TodoListController : ControllerBase
    {
        ITodoListService todoListService;

        public TodoListController(ITodoListService todoListService)
        {
            this.todoListService = todoListService;
        }

        // GET: api/TodoList
        [HttpGet]
        public IEnumerable<TodoListItem> Get()
        {
            return todoListService.Get();
        }

        // GET: api/TodoList/5
        [HttpGet("{id}", Name = "Get")]
        public TodoListItem Get(string id)
        {
            return todoListService.Get(Guid.Parse(id));
        }

        // POST: api/TodoList
        [HttpPost]
        public string Post([FromBody]string value)
        {
            return todoListService.Add(value).ToString();
        }

        // PUT: api/TodoList/5
        [HttpPut("{id}")]
        public void Put(string id, [FromBody] string value)
        {
            todoListService.Update(Guid.Parse(id), value);
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(string id)
        {
            todoListService.Delete(Guid.Parse(id));
        }
    }
}
