using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FileUploadAPI.ResultModels
{
    public class RandomUsersModel
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public int GenderId { get; set; }
        public string Gender { get; set; }
        public string FirstName{ get; set; }
        public string LastName { get; set; }
        public int Age { get; set; }
        public string Cell { get; set; }
        public string ImageURL { get; set; }

    }
}