using CompanyChat.Interfaces;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CompanyChat.Hubs
{
    public class GoatingHub : Hub, IServerHub
    {
        public void Connected()
        {
            Clients.All.connected($"{GetUserName()} is now watching.");
        }

        public void Disconnect()
        {
            Clients.All.disconnected($"{GetUserName()} has left.");
        }

        public void GoatingServer(string msg)
        {
            Clients.All.myClientListener($"Hello: {msg}");
        }

        // this will return the name of the chat server just to the caller
        public void ChatName() { Clients.Caller.chatName("zz_Goating"); }

        public void SendMessage(string msg)
        {
            Clients.All.receiveMessage($"{GetUserName()}: {msg}");
        }

        public void MyName()
        {
            Clients.Caller.myName($"{GetUserName()}");
        }

        private string GetUserName()
        {
            return Context.ConnectionId.Substring(0, 5);
        }
    }
}
