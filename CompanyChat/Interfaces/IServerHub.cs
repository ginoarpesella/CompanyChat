using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CompanyChat.Interfaces
{
    public interface IServerHub
    {
        void ChatName();
        void MyName();
        void Connected();
        void Disconnect();
        void SendMessage(string msg);
    }
}
