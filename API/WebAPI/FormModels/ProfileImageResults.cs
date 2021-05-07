using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FileUploadAPI.FormModels
{
    public class ProfileImageResults
    {
        public int Id { get; set; }
        public byte[] Image { get; set; }
        public string MimeType { get; set; }
        public string Label { get; set; }
        public string Description { get; set; }
    }
}