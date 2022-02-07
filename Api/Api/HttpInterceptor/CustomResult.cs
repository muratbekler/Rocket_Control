using Api.Model.Interceptor;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using System;

namespace Microsoft.AspNetCore.Mvc
{
    public sealed class CustomResult<TValue> : IConvertToActionResult
    {
        private ActionResult Result { get; }
        private TValue Value { get; }

        public bool isSuccessful { get; set; }
        public string message { get; set; }
        public TValue datum { get; set; }
        public CustomResult(TValue value)
        {
            if (typeof(IActionResult).IsAssignableFrom(typeof(TValue)))
            {
                isSuccessful = false;
                throw new ArgumentException("");
            }

            Value = value;
        }
        public CustomResult(ActionResult result)
        {
            if (typeof(IActionResult).IsAssignableFrom(typeof(TValue)))
            {
                isSuccessful = false;
                throw new ArgumentException("error");
            }

            Result = result ?? throw new ArgumentNullException(nameof(result));
        }
        public static implicit operator CustomResult<TValue>(TValue value)
        {
            return new CustomResult<TValue>(value);
        }

        public static implicit operator CustomResult<TValue>(ActionResult result)
        {
            return new CustomResult<TValue>(result);
        }

        IActionResult IConvertToActionResult.Convert()
        {
            isSuccessful = true;
            if (Result != null)
            {
                var ssas = Result.GetType().GetProperty("Value").GetValue(Result, null);
                return new ObjectResult(new ResponseDatum { datum = ssas, isSuccessful = true })
                {
                    DeclaredType = typeof(TValue),
                };
            }

            return new ObjectResult(new ResponseDatum(Value))
            {
                DeclaredType = typeof(TValue),
            };
        }
    }
}