using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TodoListWebAPI.Models;

namespace TodoListWebAPI.Services
{
    public class TodoListService : ITodoListService
    {
        private readonly IList<TodoListItem> todoListItems;

        public TodoListService()
        {
            todoListItems = new List<TodoListItem>();
        }

        public Guid Add(string item)
        {
            Guid id = Guid.NewGuid();
            todoListItems.Add(new TodoListItem
            {
                Id = id,
                Item = item
            });
            return id;
        }

        public TodoListItem Get(Guid id)
        {
            return todoListItems.FirstOrDefault(x => x.Id == id);
        }

        public List<TodoListItem> Get()
        {
            return todoListItems.ToList();
        }

        public void Update(Guid id, string item)
        {
            TodoListItem itemInList = todoListItems.FirstOrDefault(x => x.Id == id);
            if (itemInList == null)
            {
                throw new KeyNotFoundException();
            }

            todoListItems[todoListItems.IndexOf(itemInList)].Item = item;
        }

        public void Delete(Guid id)
        {
            TodoListItem itemInList = todoListItems.FirstOrDefault(x => x.Id == id);
            if (itemInList == null)
            {
                throw new KeyNotFoundException();
            }

            todoListItems.Remove(itemInList);
        }
    }
}
