using System;

namespace Api.Model.CustomException
{
    public class FriendlyAreaException : Exception
    {
        public FriendlyAreaException(string message) : base(message)
        {
        }
    }
}
