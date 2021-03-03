using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReactBookmarks.Web.Models
{
    public class UpdateBookmarkViewModel
    {
        public string NewTitle { get; set; }
        public int BookmarkId { get; set; }
    }
}
