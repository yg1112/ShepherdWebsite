import React, { useRef, useState } from 'react';
import { Upload, X, CheckCircle, Loader2 } from 'lucide-react';
import { useAppPreferences } from '../contexts/AppPreferencesContext';
import { getLocalizedCopy } from '../i18n/localize';

const WORKER_URL = 'https://shepherd-contact.gaoyukun1205.workers.dev';

const contactCopy = {
  en: {
    submitSuccessTitle: 'Thanks for reaching out!',
    submitSuccessBody: "We've received your feedback and will get back to you as soon as possible.",
    submitAnother: 'Share more',
    sectionTag: 'Contact Us',
    title: 'Build with Us',
    intro: "We're building Shepherd in the open, and your feedback shapes its direction. Whether it's a feature request, a bug report, or just a thought — we'd love to hear from you.",
    nameLabel: 'What should we call you?',
    namePlaceholder: 'Your name / nickname',
    emailLabel: 'Your Email',
    emailPlaceholder: 'For our reply',
    messageLabel: "What's on your mind?",
    messageHint: 'Share your thoughts, ideas, or any issues you encountered.',
    messagePlaceholder: "Tell us what features you'd like to see in Shepherd, or what doesn't feel right. If you'd like, share your use case too...",
    uploadLabel: 'File Upload',
    uploadHint: 'Screenshots or Screen Recording (Optional) — A picture is worth a thousand words.',
    uploadAction: 'Click to choose a file or drag here',
    uploadLimit: 'Size limit: 10 MB',
    fileTooLarge: 'File size must be less than 10MB',
    submitFailed: 'Failed to submit. Please try again.',
    submitting: 'Sending...',
    submit: 'Send to Team',
  },
  zh: {
    submitSuccessTitle: '感谢你的反馈！',
    submitSuccessBody: '我们已收到你的信息，会尽快回复。',
    submitAnother: '继续分享',
    sectionTag: '联系我们',
    title: '共建 Shepherd',
    intro: '我们在公开构建 Shepherd，你的反馈决定它的走向。无论是新功能灵感、Bug 报告，还是任何想法，都欢迎告诉我们。',
    nameLabel: '怎么称呼你？',
    namePlaceholder: '你的名字 / 昵称',
    emailLabel: '你的邮箱',
    emailPlaceholder: '用于接收回复',
    messageLabel: '你有什么想法或发现？',
    messageHint: '分享你的想法、建议，或遇到的问题。',
    messagePlaceholder: '告诉我们你希望 Shepherd 增加什么功能，或者哪里让你觉得不好用。如果不介意，也可以聊聊你的使用场景...',
    uploadLabel: '上传文件',
    uploadHint: '截图或录屏（可选）— 一图胜千言，帮我们更快定位问题。',
    uploadAction: '点击选择文件或拖拽到这里',
    uploadLimit: '大小上限：10 MB',
    fileTooLarge: '文件大小不能超过 10MB',
    submitFailed: '提交失败，请稍后重试。',
    submitting: '发送中...',
    submit: '发送给团队',
  },
};

const ContactPage = () => {
  const { language } = useAppPreferences();
  const copy = getLocalizedCopy(contactCopy, language);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const fileInputRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') setDragActive(true);
    else if (e.type === 'dragleave') setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]);
  };

  const handleFile = (selectedFile) => {
    if (selectedFile.size > 10 * 1024 * 1024) { setErrorMessage(copy.fileTooLarge); return; }
    setFile(selectedFile);
    setErrorMessage('');
  };

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files[0]) handleFile(e.target.files[0]);
  };

  const removeFile = () => {
    setFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    setErrorMessage('');
    try {
      const formPayload = new FormData();
      formPayload.append('name', formData.name);
      formPayload.append('email', formData.email);
      formPayload.append('message', formData.message);
      if (file) formPayload.append('file', file);
      const response = await fetch(WORKER_URL, { method: 'POST', body: formPayload });
      if (!response.ok) throw new Error('Failed to submit feedback');
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setFile(null);
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage(copy.submitFailed);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitStatus === 'success') {
    return (
      <main className="pt-28 min-h-screen pb-20">
        <div className="max-w-2xl mx-auto px-6">
          <div className="text-center py-16">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
            <h1 className="text-3xl font-medium text-gray-900 dark:text-gray-100 mb-4">{copy.submitSuccessTitle}</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8">{copy.submitSuccessBody}</p>
            <button
              onClick={() => setSubmitStatus(null)}
              className="px-6 py-2.5 rounded-full bg-[#002FA7] text-white text-sm font-medium hover:bg-[#001B6B] transition-colors"
            >
              {copy.submitAnother}
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-28 min-h-screen pb-20">
      <div className="max-w-2xl mx-auto px-6">
        <section className="mb-10">
          <p className="text-xs uppercase tracking-[0.22em] text-gray-500 dark:text-gray-400 mb-5">{copy.sectionTag}</p>
          <h1 className="text-4xl md:text-5xl leading-tight tracking-tight font-medium text-gray-900 dark:text-gray-100 mb-5">{copy.title}</h1>
          <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 leading-relaxed">{copy.intro}</p>
        </section>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">{copy.nameLabel} <span className="text-red-500">*</span></label>
            <input type="text" id="name" name="name" required value={formData.name} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-black/10 dark:border-white/10 bg-white/72 dark:bg-black/45 backdrop-blur-md text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#002FA7]/30 dark:focus:ring-[#002FA7]/50 transition-all" placeholder={copy.namePlaceholder} />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">{copy.emailLabel} <span className="text-red-500">*</span></label>
            <input type="email" id="email" name="email" required value={formData.email} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-black/10 dark:border-white/10 bg-white/72 dark:bg-black/45 backdrop-blur-md text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#002FA7]/30 dark:focus:ring-[#002FA7]/50 transition-all" placeholder={copy.emailPlaceholder} />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">{copy.messageLabel} <span className="text-red-500">*</span></label>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{copy.messageHint}</p>
            <textarea id="message" name="message" required rows={5} value={formData.message} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-black/10 dark:border-white/10 bg-white/72 dark:bg-black/45 backdrop-blur-md text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#002FA7]/30 dark:focus:ring-[#002FA7]/50 transition-all resize-y min-h-[120px]" placeholder={copy.messagePlaceholder} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">{copy.uploadLabel}</label>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{copy.uploadHint}</p>
            {file ? (
              <div className="flex items-center gap-3 p-4 rounded-xl border border-black/10 dark:border-white/10 bg-white/72 dark:bg-black/45">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">{file.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
                <button type="button" onClick={removeFile} className="p-1.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
                  <X size={18} className="text-gray-500 dark:text-gray-400" />
                </button>
              </div>
            ) : (
              <div onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop} onClick={() => fileInputRef.current?.click()} className={`flex flex-col items-center justify-center p-8 rounded-xl border-2 border-dashed cursor-pointer transition-all ${dragActive ? 'border-[#002FA7]/40 bg-[#002FA7]/5' : 'border-black/10 dark:border-white/10 hover:border-black/20 dark:hover:border-white/20'}`}>
                <Upload size={24} className="text-gray-400 dark:text-gray-500 mb-3" />
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{copy.uploadAction}</p>
                <p className="text-xs text-gray-400 dark:text-gray-500">{copy.uploadLimit}</p>
              </div>
            )}
            <input ref={fileInputRef} type="file" onChange={handleFileSelect} accept="image/*,video/*,.pdf" className="hidden" />
          </div>
          {errorMessage && <p className="text-sm text-red-500 dark:text-red-400">{errorMessage}</p>}
          <button type="submit" disabled={isSubmitting} className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#002FA7] text-white text-sm font-medium hover:bg-[#001B6B] transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
            {isSubmitting ? (<><Loader2 size={16} className="animate-spin" /><span>{copy.submitting}</span></>) : (<span>{copy.submit}</span>)}
          </button>
        </form>
      </div>
    </main>
  );
};

export default ContactPage;
