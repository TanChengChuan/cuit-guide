import React, { useState } from 'react';
import { MessageSquare, Settings } from 'lucide-react';

/**
 * 主布局组件 - 实现三栏布局
 * 左侧：可折叠的二级菜单（聊天记录 + 智能体市场）
 * 中间：聊天页面
 * 右侧：MCP设置按钮
 */
export const Layout: React.FC = () => {
  const [isLeftPanelOpen, setIsLeftPanelOpen] = useState(true);
  const [isMCPDrawerOpen, setIsMCPDrawerOpen] = useState(false);

  return (
    <div className="h-screen flex bg-gray-50">
      {/* 左侧栏 - 可折叠 */}
      <div className={`${isLeftPanelOpen ? 'w-80' : 'w-16'} transition-all duration-300 bg-white border-r border-gray-200 flex flex-col`}>
        {/* 左侧栏顶部 - 切换按钮 */}
        <div className="p-4 border-b border-gray-100">
          <button
            onClick={() => setIsLeftPanelOpen(!isLeftPanelOpen)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <MessageSquare className="w-5 h-5 text-gray-600" />
          </button>
        </div>
        
        {/* 左侧栏内容 */}
        <div className="flex-1 overflow-hidden">
          {isLeftPanelOpen && (
            <div className="p-4">
              <h3 className="text-sm font-medium text-gray-900 mb-4">聊天记录</h3>
              <div className="space-y-2 text-sm text-gray-500">
                <div>暂无聊天记录</div>
              </div>
              
              <h3 className="text-sm font-medium text-gray-900 mt-8 mb-4">智能体市场</h3>
              <div className="space-y-2 text-sm text-gray-500">
                <div>• Claude Sonnet 4</div>
                <div>• GPT-4</div>
                <div>• MCP Agent</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 中间聊天区域 */}
      <div className="flex-1 flex flex-col">
        {/* 聊天消息区域 */}
        <div className="flex-1 p-8 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageSquare className="w-8 h-8 text-blue-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">需要什么帮助？</h2>
            <p className="text-gray-500">请在下方输入您的问题</p>
          </div>
        </div>
        
        {/* 输入框 */}
        <div className="p-6 border-t border-gray-200 bg-white">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3">
              <input
                type="text"
                placeholder="请输入问题或需求"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                发送
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 右侧 MCP 设置按钮 */}
      <div className="absolute top-4 right-4">
        <button
          onClick={() => setIsMCPDrawerOpen(true)}
          className="p-3 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 transition-colors"
          title="MCP 设置"
        >
          <Settings className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* MCP Drawer 简单实现 */}
      {isMCPDrawerOpen && (
        <div className="fixed inset-0 z-50">
          {/* 遮罩 */}
          <div 
            className="absolute inset-0 bg-black bg-opacity-30"
            onClick={() => setIsMCPDrawerOpen(false)}
          />
          
          {/* Drawer 内容 */}
          <div className="absolute top-0 right-0 h-full w-96 bg-white shadow-lg">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">MCP 服务器</h2>
                <button
                  onClick={() => setIsMCPDrawerOpen(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="p-4 border border-gray-200 rounded-lg">
                  <div className="font-medium">文件系统 MCP</div>
                  <div className="text-sm text-gray-500 mt-1">本地文件操作</div>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                    <span className="text-xs text-gray-500">未连接</span>
                  </div>
                </div>
                
                <div className="p-4 border border-gray-200 rounded-lg">
                  <div className="font-medium">网络搜索 MCP</div>
                  <div className="text-sm text-gray-500 mt-1">网页搜索功能</div>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                    <span className="text-xs text-gray-500">未连接</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
