using System;
using System.Collections.Generic;
using TodoListWebAPI.Models;

namespace TodoListWebAPI.Services
{
    public interface ITodoListService
    {
        Guid Add(string item);
        void Delete(Guid id);
        List<TodoListItem> Get();
        TodoListItem Get(Guid id);
        void Update(Guid id, string item);
    }
}