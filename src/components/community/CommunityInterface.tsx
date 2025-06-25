import React, { useState } from 'react';
import { SidebarTrigger } from '../ui/sidebar';
import { Hash, Lock, Plus, Search, Users, Phone, Video, Settings, Pin, UserPlus, MoreVertical } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { ScrollArea } from '../ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';

interface Channel {
  id: string;
  name: string;
  type: 'text' | 'private';
  description?: string;
  memberCount?: number;
  unreadCount?: number;
}

interface User {
  id: string;
  name: string;
  role: 'founder' | 'lawyer' | 'investor';
  status: 'online' | 'away' | 'offline';
  avatar?: string;
  company?: string;
}

interface Message {
  id: string;
  content: string;
  author: User;
  timestamp: Date;
  edited?: boolean;
}

export const CommunityInterface: React.FC = () => {
  const [selectedChannel, setSelectedChannel] = useState<string>('general');
  const [messageInput, setMessageInput] = useState('');

  // Mock data - will be replaced with real data from Supabase
  const channels: Channel[] = [
    { id: 'general', name: 'general', type: 'text', description: 'General discussions', memberCount: 142, unreadCount: 3 },
    { id: 'legal-help', name: 'legal-help', type: 'text', description: 'Get help with legal questions', memberCount: 89 },
    { id: 'funding', name: 'funding', type: 'text', description: 'Fundraising discussions', memberCount: 67, unreadCount: 1 },
    { id: 'tech-talk', name: 'tech-talk', type: 'text', description: 'Technical discussions', memberCount: 95 },
    { id: 'lagos-founders', name: 'lagos-founders', type: 'text', description: 'Lagos-based founders', memberCount: 34 },
    { id: 'fintech', name: 'fintech', type: 'text', description: 'FinTech startups', memberCount: 52 },
  ];

  const privateChannels: Channel[] = [
    { id: 'founders-only', name: 'founders-only', type: 'private', description: 'Verified founders only', memberCount: 78 },
    { id: 'legal-partners', name: 'legal-partners', type: 'private', description: 'Legal professionals', memberCount: 23 },
  ];

  const onlineUsers: User[] = [
    { id: '1', name: 'Adebayo Ogundimu', role: 'founder', status: 'online', company: 'PayStack' },
    { id: '2', name: 'Kemi Adeyemi', role: 'lawyer', status: 'online', company: 'Adeyemi & Co' },
    { id: '3', name: 'Chidi Okwu', role: 'founder', status: 'away', company: 'Flutterwave' },
    { id: '4', name: 'Aisha Muhammad', role: 'investor', status: 'online', company: 'Future Africa' },
    { id: '5', name: 'Tunde Kehinde', role: 'founder', status: 'online', company: 'Lidya' },
  ];

  const messages: Message[] = [
    {
      id: '1',
      content: 'Welcome to the general channel! This is where we discuss all things startup-related.',
      author: { id: '1', name: 'Adebayo Ogundimu', role: 'founder', status: 'online', company: 'PayStack' },
      timestamp: new Date(Date.now() - 1000 * 60 * 30)
    },
    {
      id: '2',
      content: 'Has anyone here gone through the CBN FinTech licensing process? Would love to connect and learn from your experience.',
      author: { id: '3', name: 'Chidi Okwu', role: 'founder', status: 'away', company: 'Flutterwave' },
      timestamp: new Date(Date.now() - 1000 * 60 * 15)
    },
    {
      id: '3',
      content: '@Chidi Happy to help! We went through that process last year. Feel free to DM me.',
      author: { id: '2', name: 'Kemi Adeyemi', role: 'lawyer', status: 'online', company: 'Adeyemi & Co' },
      timestamp: new Date(Date.now() - 1000 * 60 * 10)
    }
  ];

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'founder': return 'bg-blue-100 text-blue-800';
      case 'lawyer': return 'bg-green-100 text-green-800';
      case 'investor': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  const selectedChannelData = channels.find(c => c.id === selectedChannel) || privateChannels.find(c => c.id === selectedChannel);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Channels Sidebar */}
      <div className="w-64 bg-gray-900 text-white flex flex-col">
        {/* Server Header */}
        <div className="p-3 border-b border-gray-700 flex items-center justify-between">
          <h2 className="font-semibold text-white">StartupGPT Community</h2>
          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white h-6 w-6 p-0">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>

        <ScrollArea className="flex-1 px-2">
          {/* Search */}
          <div className="p-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input 
                placeholder="Search channels..." 
                className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 pl-9 h-8"
              />
            </div>
          </div>

          {/* Text Channels */}
          <div className="px-2 py-2">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Text Channels</span>
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white h-4 w-4 p-0">
                <Plus className="h-3 w-3" />
              </Button>
            </div>
            {channels.map((channel) => (
              <Button
                key={channel.id}
                variant="ghost"
                className={`w-full justify-start mb-1 h-8 px-2 ${
                  selectedChannel === channel.id 
                    ? 'bg-gray-700 text-white' 
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
                onClick={() => setSelectedChannel(channel.id)}
              >
                <Hash className="h-4 w-4 mr-2" />
                <span className="flex-1 text-left text-sm">{channel.name}</span>
                {channel.unreadCount && (
                  <Badge variant="destructive" className="h-4 text-xs px-1">
                    {channel.unreadCount}
                  </Badge>
                )}
              </Button>
            ))}
          </div>

          {/* Private Channels */}
          <div className="px-2 py-2">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Private Channels</span>
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white h-4 w-4 p-0">
                <Plus className="h-3 w-3" />
              </Button>
            </div>
            {privateChannels.map((channel) => (
              <Button
                key={channel.id}
                variant="ghost"
                className={`w-full justify-start mb-1 h-8 px-2 ${
                  selectedChannel === channel.id 
                    ? 'bg-gray-700 text-white' 
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
                onClick={() => setSelectedChannel(channel.id)}
              >
                <Lock className="h-4 w-4 mr-2" />
                <span className="flex-1 text-left text-sm">{channel.name}</span>
              </Button>
            ))}
          </div>

          {/* Direct Messages */}
          <div className="px-2 py-2">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Direct Messages</span>
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white h-4 w-4 p-0">
                <Plus className="h-3 w-3" />
              </Button>
            </div>
            {/* DM list will go here */}
          </div>
        </ScrollArea>

        {/* User Info */}
        <div className="p-2 border-t border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-blue-500 text-white text-xs">
                  JD
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">John Doe</p>
                <p className="text-xs text-gray-400 truncate">Founder</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white h-6 w-6 p-0">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Channel Header */}
        <div className="h-12 bg-white border-b border-gray-200 flex items-center justify-between px-4">
          <div className="flex items-center space-x-3">
            <SidebarTrigger className="h-7 w-7" />
            <div className="flex items-center space-x-2">
              {selectedChannelData?.type === 'private' ? (
                <Lock className="h-5 w-5 text-gray-500" />
              ) : (
                <Hash className="h-5 w-5 text-gray-500" />
              )}
              <h3 className="font-semibold text-gray-900">{selectedChannelData?.name}</h3>
              <Separator orientation="vertical" className="h-4" />
              <span className="text-sm text-gray-500">{selectedChannelData?.description}</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <Phone className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <Video className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <Pin className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <UserPlus className="h-4 w-4" />
            </Button>
            <Separator orientation="vertical" className="h-4" />
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Messages Area */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div key={message.id} className="flex space-x-3 hover:bg-gray-50 p-2 rounded-lg group">
                <Avatar className="h-10 w-10 mt-1">
                  <AvatarFallback className="bg-blue-500 text-white">
                    {message.author.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="font-semibold text-gray-900">{message.author.name}</span>
                    <Badge className={getRoleColor(message.author.role)} variant="secondary">
                      {message.author.role}
                    </Badge>
                    {message.author.company && (
                      <span className="text-xs text-gray-500">@ {message.author.company}</span>
                    )}
                    <span className="text-xs text-gray-500">{formatTime(message.timestamp)}</span>
                  </div>
                  <p className="text-gray-800 text-sm leading-relaxed">{message.content}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Message Input */}
        <div className="p-4 bg-white border-t border-gray-200">
          <div className="flex space-x-2">
            <div className="flex-1">
              <Input
                placeholder={`Message #${selectedChannelData?.name}`}
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                className="w-full"
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && messageInput.trim()) {
                    // Handle send message
                    setMessageInput('');
                  }
                }}
              />
            </div>
            <Button 
              size="sm" 
              disabled={!messageInput.trim()}
              onClick={() => {
                if (messageInput.trim()) {
                  // Handle send message
                  setMessageInput('');
                }
              }}
            >
              Send
            </Button>
          </div>
        </div>
      </div>

      {/* Members Sidebar */}
      <div className="w-60 bg-gray-50 border-l border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-1">Members</h3>
          <p className="text-sm text-gray-500">{selectedChannelData?.memberCount || 0} members</p>
        </div>
        <ScrollArea className="flex-1 p-2">
          <div className="space-y-1">
            <div className="px-2 py-1">
              <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Online — {onlineUsers.filter(u => u.status === 'online').length}
              </h4>
            </div>
            {onlineUsers.filter(u => u.status === 'online').map((user) => (
              <div key={user.id} className="flex items-center space-x-2 px-2 py-1 rounded hover:bg-gray-100 cursor-pointer">
                <div className="relative">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-green-500 text-white text-xs">
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-green-500 border-2 border-white rounded-full"></div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
                  <div className="flex items-center space-x-1">
                    <Badge className={getRoleColor(user.role)} variant="secondary">
                      {user.role}
                    </Badge>
                    {user.company && (
                      <span className="text-xs text-gray-500 truncate">@ {user.company}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            {onlineUsers.filter(u => u.status === 'away').length > 0 && (
              <>
                <div className="px-2 py-1 mt-4">
                  <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Away — {onlineUsers.filter(u => u.status === 'away').length}
                  </h4>
                </div>
                {onlineUsers.filter(u => u.status === 'away').map((user) => (
                  <div key={user.id} className="flex items-center space-x-2 px-2 py-1 rounded hover:bg-gray-100 cursor-pointer opacity-60">
                    <div className="relative">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-yellow-500 text-white text-xs">
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-yellow-500 border-2 border-white rounded-full"></div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-700 truncate">{user.name}</p>
                      <div className="flex items-center space-x-1">
                        <Badge className={getRoleColor(user.role)} variant="secondary">
                          {user.role}
                        </Badge>
                        {user.company && (
                          <span className="text-xs text-gray-500 truncate">@ {user.company}</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}; 