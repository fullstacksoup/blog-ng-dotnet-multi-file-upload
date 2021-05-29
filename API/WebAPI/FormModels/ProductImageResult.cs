using FileUploadAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FileUploadAPI.ResultModels
{
    public class ProductImageResult
    {
        public int Id { get; set; }
        public string Title { get; set; }

        public ICollection<ProductImage> Images { get; set; }
    }
}