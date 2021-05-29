using FileUploadAPI.Models;
using FileUploadAPI.ResultModels;
using FileUploadAPI.Utilities;
using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Runtime.Serialization.Formatters.Binary;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using System.Web.Http.Cors;


namespace FileUploadAPI.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    [RoutePrefix("api/product")]
    public class UserImageController : ApiController
    {

        //********************************************************************************
        // C L A S S   T O   S T O R E   P R O D U C T   A N D   I M A G E S   A R R A Y
        //********************************************************************************

        public class ProductData
        {
            public ICollection<ProductImageResult> record { get; set; }
            public ProductData()
            {
                this.record = new List<ProductImageResult>();
            }
        }

        //********************************************************************************
        // G E T   P R O D U C T S   A N D   P R O D U C T   I M A G E S
        //********************************************************************************

        [HttpGet]
        [Route("get")]
        public object getDBImageList()
        {
            try
            {
                using (MultiFileUploadDBEntities db = new MultiFileUploadDBEntities())
                {

                    var ProductJSONObj = new ProductData { };

                    var queryResults = db.Products.ToList();

                    foreach (var item in queryResults)
                    {
                        ProductImageResult record = new ProductImageResult();
                        record.Id = item.Id;
                        record.Title = item.Title;

                        var ProdImages = db.ProductImages.Where(col => col.ProductId == item.Id).ToArray();

                        record.Images = ProdImages;

                        ProductJSONObj.record.Add(record);
                    }

                    return new { status = StatusCodes.OK.code, msg = StatusCodes.OK.msg, data = ProductJSONObj };
                }
            }
            catch (System.Exception e)
            {
                return new { status = StatusCodes.NotFound.code, msg = e.InnerException, data = 0 };
            }
        }

        //********************************************************************************
        // A D D   N E W   P R O D U C T   A N D   P R O D U C T   I M A G E S
        //********************************************************************************

        [HttpPost]
        [Route("add")]
        public async Task<IHttpActionResult> addImageToDatabase()
        {
            // Check if the request contains multipart/form-data.
            if (!Request.Content.IsMimeMultipartContent())
            {
                throw new HttpResponseException(HttpStatusCode.UnsupportedMediaType);
            }
            var ctx = HttpContext.Current;
            var root = ctx.Server.MapPath("~/Content");
            var provider = new MultipartFormDataStreamProvider(root);


            DateTime today = DateTime.Today;
            try
            {
                using (MultiFileUploadDBEntities db = new MultiFileUploadDBEntities())
                {
                    // Read the form data.
                    await Request.Content.ReadAsMultipartAsync(provider);
                    var uniqueFileName = "";
                    NameValueCollection formdata = provider.FormData;

                    Product ProductForm = new Product();
                    ProductForm.Title = formdata["Title"];
                    db.Products.Add(ProductForm);
                    db.SaveChanges();

                    foreach (MultipartFileData file in provider.FileData)
                    {
                        

                        // Get File Size
                        byte[] documentData = File.ReadAllBytes(file.LocalFileName);
                        long fileSize = documentData.Length;

                        // Get File Name
                        var fileName = file.Headers.ContentDisposition.FileName.Replace("\"", string.Empty);
                        string mimeType = file.Headers.ContentType.MediaType;

                        ProductImage ProductImageForm = new ProductImage();
                        Guid g = Guid.NewGuid();

                        // Get Mimetype
                        var fileType = "jpg";
                        switch(mimeType)
                        {
                            case "image/jpeg": fileType = "jpg"; break;
                            case "image/jpg": fileType = "jpg"; break;
                            case "image/png": fileType = "png"; break;
                            case "image/bmp": fileType = "bmp"; break;
                            case "image/gif": fileType = "gif"; break;
                            default: fileType = "jpg"; break;
                        }
                                                
                        var parentId = ProductForm.Id.ToString();
                        
                        var newFilename = g.ToString() + "." + fileType;
                        
                        var path = ProductForm.Id.ToString() + "/" + newFilename;
                        
                        string subPath = root + "\\images\\" + parentId; // Your code goes here

                        bool exists = Directory.Exists(subPath);

                        if (!exists)
                            Directory.CreateDirectory(subPath);

                        var localFileName = file.LocalFileName;
                        var filepath = Path.Combine(root, uniqueFileName);
                        
                        File.Move(localFileName, subPath + "\\" + newFilename);
                        
                        ProductImageForm.FileName = newFilename;
                        ProductImageForm.ProductId = ProductForm.Id;
                        ProductImageForm.ImagePath = path;
                        ProductImageForm.FileSize = fileSize;
                        
                        ProductImageForm.MimeType = mimeType;
                        ProductImageForm.DateCreated = today;

                        db.ProductImages.Add(ProductImageForm);
                        db.SaveChanges();                        
                    }

                    return Ok("Successfully Added Record and Images");
                }

            }
            catch (System.Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        //********************************************************************************
        // D E L E T E   P R O D U C T   I M A G E S    A N D    P R O D U C T   R E C O R D
        //********************************************************************************

        [HttpDelete]
        [Route("remove/{id}")]
        public object renoveProduct(int id)
        {                     
            try
            {
                var ctx = HttpContext.Current;
                var root = ctx.Server.MapPath("~/Content");
                var provider = new MultipartFormDataStreamProvider(root);

                using (MultiFileUploadDBEntities db = new MultiFileUploadDBEntities())
                {
                    var product = db.Products.Find(id);
                    var images = db.ProductImages.Where(col => col.ProductId == id).ToArray();
                    
                    // Remove Each File
                    for (int i = 0; i < images.Length; i++)
                    {
                        var filepath = root + "\\images\\" + images[i].ImagePath;
                        FileInfo file = new FileInfo(filepath);
                        if (file.Exists)//check file exsit or not  
                        {
                            file.Delete();
                        }
                        var imageRecord = db.ProductImages.Find(images[i].Id);
                        db.ProductImages.Remove(imageRecord);
                    }
                    
                    // Remove the Directory
                    var dirpath = root + "\\images\\" + product.Id;
                    Directory.Delete(dirpath);

                    // Remove the parent record
                    db.Products.Remove(product);
                    db.SaveChanges();
                    return Ok("Successfully Deleted Record and Images");
                }

            }
            catch (System.Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}

