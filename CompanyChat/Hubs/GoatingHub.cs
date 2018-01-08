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
            Clients.All.InvokeAsync("connected", ($"{GetUserName()} is now watching."));
        }

        public void Disconnect()
        {
            Clients.All.InvokeAsync("disconnected", ($"{GetUserName()} has left."));
        }

        public void GoatingServer(string msg)
        {
            Clients.All.InvokeAsync("myClientListener", ($"Hello: {msg}"));
        }

        // this will return the name of the chat server just to the caller
        public void ChatName() { Clients.Client(Context.ConnectionId).InvokeAsync("chatName", ("zz_Goating")); }

        public void SendMessage(string msg)
        {
            Clients.AllExcept(new string[] { Context.ConnectionId }).InvokeAsync("receiveMessage", ($"{GetUserName()}: {msg}"));
        }

        public void MyName()
        {
            Clients.Client(Context.ConnectionId).InvokeAsync("myName", ($"{GetUserName()}"));
        }

        private string GetUserName()
        {
            return Context.ConnectionId.Substring(0, 5);
        }
    }
}
