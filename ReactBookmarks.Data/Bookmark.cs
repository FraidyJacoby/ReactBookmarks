using System;
using System.Collections.Generic;

namespace ReactBookmarks.Data
{
    public class Bookmark
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Url { get; set; }
        public int UserId { get; set; }
    }
}
