using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/*
 * 
1xx: Informational	Communicates transfer protocol-level information.
2xx: Success	Indicates that the client’s request was accepted successfully.
3xx: Redirection	Indicates that the client must take some additional action in order to complete their request.
4xx: Client Error	This category of error status codes points the finger at clients.
5xx: Server Error	The server takes responsibility for these error status codes.
 */

namespace FileUploadAPI.Utilities
{
    public static class StatusCodes
    {
        public struct OK
        {
            public static int code = 200;
            public static string msg = "Success";
        }

        public struct Created
        {
            public static int code = 201;
            public static string msg = "Created";
        }

        public struct Accepted
        {
            public static int code = 202;
            public static string msg = "Accepted";
        }

        public struct MovedPermanently
        {
            public static int code = 301;
            public static string msg = "Moved Permanently";
        }

        public struct Found
        {
            public static int code = 302;
            public static string msg = "Found";
        }

        public struct NotModified
        {
            public static int code = 304;
            public static string msg = "Not Modified";
        }

        public struct BadRequest
        {
            public static int code = 400;
            public static string msg = "Bad Request";
        }

        public struct Unauthorized
        {
            public static int code = 401;
            public static string msg = "Unauthorized";
        }
        public struct Fobidden
        {
            public static int code = 403;
            public static string msg = "Forbidden";
        }
        public struct NotFound
        {
            public static int code = 404;
            public static string msg = "Not Found";
        }

        public struct NotAcceptable
        {
            public static int code = 406;
            public static string msg = "Not Acceptable";
        }

        public struct PreconditionFailed
        {
            public static int code = 412;
            public static string msg = "Precondiction Failed";
        }

        public struct UnsupportedsMedia
        {
            public static int code = 415;
            public static string msg = "Unsupported Media";
        }

        public struct ServerError
        {
            public static int code = 500;
            public static string msg = "Server Error";
        }

        public struct NotImplemented
        {
            public static int code = 501;
            public static string msg = "Not Implemented";
        }

        //public static int okCode = 200;
        //public static int CreatedCode = 201;
        //public static int AcceptedCode = 202;
        //public static int FoundCode = 302;
        //public static int NotModifiedCode = 304;
        //public static int BadRequestCode = 400;
        //public static int UnauthorizedCode = 401;
        //public static int NotFoundCode = 404;
        //public static int ServerError = 500;
        //public static int NotImplementedCode = 500;
    }
}
