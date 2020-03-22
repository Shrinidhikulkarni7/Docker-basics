using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TodoListWebAPI.Models
{
    public class TodoListItem
    {
        public Guid Id { get; set; }
        public string Item { get; set; }

        public override bool Equals(object obj)
        {
            if (!(obj is TodoListItem todoListItem))
            {
                return false;
            }
            else
            {
                return Id == todoListItem.Id;
            }
        }

        public override int GetHashCode()
        {
            return Id.GetHashCode();
        }
    }
}
