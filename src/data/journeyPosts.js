const localizedJourneyPosts = [
  {
    id: 4,
    date: 'March 2026',
    category: 'Reflection',
    title: {
      en: 'Built with Claude',
      zh: '与 Claude 共同构建',
    },
    summary: {
      en: 'Every single commit in Shepherd carries the line Co-Authored-By: Claude. This is a reflection on what it means to build an entire macOS app with an AI co-author.',
      zh: 'Shepherd 的每一个 commit 都带有 Co-Authored-By: Claude。这是一篇关于与 AI 共同构建一整个 macOS 应用的思考。',
    },
    content: {
      en: `### Every Commit, Every Line

There is a line at the bottom of every single commit in Shepherd's git history:

\`Co-Authored-By: Claude\`

Not most commits. Not the boilerplate ones. **Every single one.** From the first \`init\` to the latest architecture refactor. I want to talk about what that actually felt like, because it was unlike anything I have experienced in over a decade of writing software.

### The Pairing Experience

I have pair-programmed with humans before. You know the rhythm: one person drives, the other navigates, you swap, you argue about naming, you get coffee. Pairing with Claude is a fundamentally different thing. There is no ego negotiation. There is no context-switching penalty when you hand over the keyboard. You describe what you want in plain language, you get back working Swift code, and then the interesting part begins: you *read* it.

Reading AI-generated code is a skill. You learn to scan for the shape of the solution first, then drill into edge cases. Does it handle the \`nil\` window reference? Does it clean up the observer on \`deinit\`? Claude gets the architecture right almost every time. The subtleties of macOS lifecycle management, the \`AXUIElement\` permission dance, the correct way to layer an \`NSWindow\` above all spaces -- these are things that would normally cost me hours of documentation diving. With Claude, I described the behavior I wanted and received idiomatic SwiftUI and AppKit code that *worked*.

### Velocity That Changes Your Thinking

On January 13, 2026, Shepherd went from an empty Xcode project to version 3.1. In one day. That is not a typo, and it was not a toy prototype. By the end of that day, the app had window-sticky monitoring marks, smart snap positioning via Accessibility APIs, an audio replay buffer, and adaptive frame rate rendering. Features that I would have estimated at two to three weeks of solo work.

This kind of velocity does something to your brain. When building is fast, you stop hoarding ideas and start *testing* them. You try the crazy approach first because the cost of failure is twenty minutes, not two days. It changes your relationship with risk entirely.

### Where Human Judgment Lives

But here is the thing people get wrong about AI-assisted development: the hard part was never writing the code. The hard part is knowing **what to build** and, more importantly, **what to delete**.

In March 2026, I ripped out the entire local Whisper integration and the OCR pipeline. Claude had helped me build both of them, and they worked. But they were wrong for the product. They added weight, complexity, and privacy concerns that a lightweight menu bar app should not carry. No AI told me to remove them. That was a product judgment call, the kind of decision that comes from staring at your app in daily use and feeling the friction.

Claude is an extraordinary co-author. But the author is still me. I decide the product direction, the UX philosophy, the architecture tradeoffs. Claude gives me the freedom to execute on those decisions at a speed that would have been unimaginable a few years ago.

### What This Means for Indie Dev

I am one person. Shepherd is a native macOS app with a Cloudflare Worker backend, real-time window tracking at 20 FPS, semantic text analysis, multi-channel alerts, and a full mission-control-style window picker. A few years ago, this would have been a small team's worth of work. Today, it is a solo developer and an AI, moving fast and staying focused.

This is not the future of software development. It is the present. And honestly? It is the most fun I have ever had building software. Every commit proves it.`,
      zh: `### 每一个 Commit，每一行代码

在 Shepherd 的 git 历史中，每一个 commit 的底部都有这样一行：

\`Co-Authored-By: Claude\`

不是大部分 commit，不是那些模板代码的 commit。**每一个。** 从第一个 \`init\` 到最近的架构重构。我想聊聊这到底是什么感觉，因为这和我十多年写软件以来的任何经历都不同。

### 结对编程的新体验

我以前和人结对编程过。你知道那个节奏：一个人写，一个人看，轮换，争论命名，去倒杯咖啡。和 Claude 结对是一件本质上不同的事情。没有 ego 的协商，没有交接键盘时的上下文切换代价。你用自然语言描述你想要的东西，你拿到能运行的 Swift 代码，然后有趣的部分开始了：你去 **读** 它。

阅读 AI 生成的代码是一项技能。你学会先扫视解决方案的整体结构，然后深入边界情况。它处理了 \`nil\` 的 window reference 吗？它在 \`deinit\` 时清理了 observer 吗？Claude 几乎每次都能把架构做对。macOS 生命周期管理的微妙之处、\`AXUIElement\` 的权限申请流程、在所有 space 之上正确叠加 \`NSWindow\` 的方式——这些通常需要我花几个小时翻文档。而和 Claude 合作，我描述想要的行为，就能收到地道的 SwiftUI 和 AppKit 代码，而且 **能跑**。

### 改变思维方式的开发速度

2026 年 1 月 13 日，Shepherd 从一个空的 Xcode 项目变成了 v3.1。一天之内。这不是打错字，也不是一个玩具原型。那天结束时，应用已经有了窗口吸附的监控标记、通过 Accessibility API 实现的智能贴靠、音频回放缓冲区，以及自适应帧率渲染。这些功能如果我一个人做，估计需要两到三周。

这种速度会改变你的大脑。当构建变得很快时，你不再囤积想法，而是开始 **验证** 它们。你会先试那个疯狂的方案，因为失败的代价是二十分钟，而不是两天。这完全改变了你和风险之间的关系。

### 人类判断力的位置

但这里有一个人们对 AI 辅助开发最大的误解：难的部分从来不是写代码。难的部分是知道 **该构建什么**，更重要的是，**该删除什么**。

2026 年 3 月，我把整个本地 Whisper 集成和 OCR pipeline 全部删掉了。Claude 帮我构建了它们，而且它们能工作。但对于这个产品来说，它们是错的。它们给一个应该保持轻量的 menu bar app 增加了重量、复杂度和隐私问题。没有 AI 告诉我要删掉它们。那是一个产品判断，那种需要你每天使用自己的应用、感受其中摩擦才能做出的决定。

Claude 是一个出色的 co-author。但 author 仍然是我。产品方向、UX 哲学、架构取舍，这些由我来决定。Claude 给了我以几年前不可想象的速度去执行这些决策的自由。

### 对独立开发者的意义

我是一个人。Shepherd 是一个原生 macOS 应用，有 Cloudflare Worker 后端、20 FPS 的实时窗口追踪、语义文本分析、多通道告警，还有一个完整的 Mission Control 风格窗口选择器。几年前，这需要一个小团队的工作量。今天，只需要一个独立开发者和一个 AI，快速前进，保持专注。

这不是软件开发的未来，这是当下。说实话？这是我做软件以来最开心的体验。每一个 commit 都是证明。`,
    },
  },
  {
    id: 3,
    date: 'March 2026',
    category: 'Engineering',
    title: {
      en: 'The Architecture Pivot',
      zh: '架构的转向',
    },
    summary: {
      en: 'Why we removed local Whisper and OCR in favor of native macOS APIs and remote supervision. Sometimes removing features is the best feature.',
      zh: '为什么我们移除了本地 Whisper 和 OCR，转向原生 macOS API 和远程监控。有时候删除功能才是最好的功能。',
    },
    content: {
      en: `### The Features That Had to Go

Shepherd v3.1 had local Whisper speech recognition and an OCR pipeline. Both worked. Both were impressive demos. And in March 2026, I deleted both of them.

This is the story of why removing features made Shepherd a better product.

### The Allure of Doing Everything Locally

The original vision was appealing: capture audio from your terminal session, run it through a local Whisper model, transcribe it, scan for error keywords. For visual monitoring, take screenshots of terminal windows and run OCR to extract text. No network calls, no cloud dependencies, fully private.

It sounded great on paper. In practice, the problems compounded:

- **CPU overhead**: Local Whisper inference is not cheap. On an M-series Mac it was manageable, but "manageable" is not the same as "lightweight." A menu bar utility should be invisible, not a line item in Activity Monitor.
- **Audio capture complexity**: Capturing system audio on macOS requires either a virtual audio device or screen recording permissions. Both are invasive for a developer tool that should feel effortless.
- **OCR fragility**: Screenshot-based OCR works until it doesn't. Font rendering, terminal themes, retina scaling, split panes -- every edge case is another failure mode.
- **Privacy perception**: Even though everything ran locally, the *idea* of an app capturing audio and taking screenshots made people uncomfortable. Perception matters as much as reality.

### The Native Alternative

Here is what replaced all of that complexity: **AppleScript**.

macOS has a built-in mechanism for reading text content from application windows. A simple \`tell application "Terminal" to get contents of selected tab of front window\` returns the actual text buffer. No screenshots. No pixel analysis. No ML models. Just the text, directly from the source.

It is faster, more reliable, uses essentially zero CPU, and requires only Accessibility permissions that developers already grant to their tools. The code went from hundreds of lines of audio/image processing to a handful of AppleScript bridge calls.

**Less code. Fewer permissions. Better results.** This is the "less is more" principle applied to architecture.

### Adding Remote Supervision

With local processing simplified, I had room to add something genuinely new: **remote supervision via Cloudflare Workers**.

The idea is straightforward. Shepherd sends lightweight heartbeat pings to a Worker endpoint. If your Mac goes silent -- a crash, a freeze, a network drop -- the Worker notices and can trigger alerts through external channels. This gives you monitoring *of* your monitoring tool, which matters when you are running long CI pipelines or overnight builds.

The Worker is minimal: a few hundred lines of TypeScript, deployed to the edge, costing essentially nothing to run. It complements the local-first architecture instead of replacing it.

### The Lesson

Engineers love adding capabilities. It feels productive. But the discipline of software craft is knowing when a feature, even a working one, does not belong. Shepherd got faster, simpler, and more trustworthy by subtracting. The architecture pivot was not a failure of the original design. It was a refinement. The best version of a product is often hiding underneath the features you are brave enough to remove.`,
      zh: `### 必须删掉的功能

Shepherd v3.1 有本地 Whisper 语音识别和一套 OCR pipeline。两个都能用，两个作为 demo 都很惊艳。然后在 2026 年 3 月，我把它们都删了。

这是一个关于"删功能如何让产品变更好"的故事。

### "全部本地运行"的诱惑

最初的构想很诱人：捕获终端会话的音频，通过本地 Whisper 模型转录，扫描错误关键词。视觉监控方面，截取终端窗口的截图，运行 OCR 提取文本。不需要网络请求，不依赖云端，完全私有。

在纸面上很完美。实际使用中，问题不断叠加：

- **CPU 开销**：本地 Whisper 推理并不便宜。在 M 系列 Mac 上还算能接受，但"能接受"和"轻量"是两码事。一个 menu bar 工具应该是隐形的，不应该成为 Activity Monitor 里的一个显眼条目。
- **音频捕获的复杂度**：在 macOS 上捕获系统音频需要虚拟音频设备或者屏幕录制权限。对于一个应该让人感觉毫不费力的开发工具来说，这两者都太侵入了。
- **OCR 的脆弱性**：基于截图的 OCR 在理想条件下可以工作，但字体渲染、终端主题、Retina 缩放、分屏面板——每一个 edge case 都是一个新的故障模式。
- **隐私感知**：即使一切都在本地运行，一个应用在"捕获音频和截图"这个 **概念** 本身就让人不舒服。感知和现实同样重要。

### 原生替代方案

替代所有这些复杂度的是什么？**AppleScript**。

macOS 有一个内置机制可以读取应用窗口的文本内容。一个简单的 \`tell application "Terminal" to get contents of selected tab of front window\` 就能返回实际的文本缓冲区。不需要截图，不需要像素分析，不需要 ML 模型。直接从源头拿到文本。

它更快、更可靠、CPU 占用几乎为零，而且只需要开发者通常已经授予给工具的 Accessibility 权限。代码从几百行的音频/图像处理变成了几个 AppleScript 桥接调用。

**更少的代码，更少的权限，更好的结果。** 这就是"少即是多"原则在架构上的应用。

### 加入远程监控

本地处理简化后，我有了空间去加入一些真正有价值的新功能：**通过 Cloudflare Workers 的远程监控**。

思路很直接。Shepherd 向 Worker 端点发送轻量级的心跳 ping。如果你的 Mac 静默了——崩溃、冻结、网络断开——Worker 会注意到并通过外部渠道触发告警。这让你拥有对监控工具本身的监控，当你在跑长时间的 CI pipeline 或者通宵 build 时，这很重要。

Worker 非常精简：几百行 TypeScript，部署在边缘节点，运行成本几乎为零。它补充了本地优先的架构，而不是替代它。

### 启示

工程师喜欢添加能力，这感觉很有生产力。但软件工艺的纪律在于，知道一个功能——即使它能工作——什么时候不属于这个产品。Shepherd 通过做减法变得更快、更简单、更值得信赖。架构转向不是原始设计的失败，而是精炼。一个产品最好的版本，往往藏在你有勇气移除的那些功能之下。`,
    },
  },
  {
    id: 2,
    date: 'January 2026',
    category: 'Design',
    title: {
      en: 'Getting the Details Right',
      zh: '把细节做对',
    },
    summary: {
      en: 'The UX polish phase: one-click window selection, multi-keyword support, and why reducing friction matters more than adding features.',
      zh: 'UX 打磨阶段：一键窗口选择、多关键词支持，以及为什么减少摩擦比增加功能更重要。',
    },
    content: {
      en: `### The Unglamorous Work

After the sprint of building Shepherd's core in a single day, the next phase was less dramatic but arguably more important: making it *feel* right. Features are worthless if people fumble through using them.

### One-Click Window Selection

The original window picker required users to drag a selection rectangle over the window they wanted to monitor. It worked, but it was awkward. You had to guess the boundaries, deal with overlapping windows, and sometimes you would select the wrong region entirely.

The fix was a full Mission Control-style overlay. Hit the hotkey, and Shepherd dims the entire screen, then highlights each window as you hover over it. Click once, and you are monitoring. The implementation uses \`CGWindowListCopyWindowInfo\` to enumerate all on-screen windows and draws hover highlights with a semi-transparent overlay \`NSWindow\` layered above everything.

One click instead of a drag-and-aim. The interaction went from "figure it out" to "just point."

### Multi-Keyword Monitoring

The first version supported a single keyword per watcher. If you wanted to catch both \`error\` and \`failed\`, you needed two watchers pointed at the same window. That is the kind of design that works in a demo but falls apart in real use.

The solution was comma-separated keywords: type \`error, failed, crash, panic\` into one field, and Shepherd watches for all of them. Combined with **semantic presets** -- pre-built keyword sets for common scenarios like "Agent Coding" or "Build & Deploy" -- setting up monitoring now takes seconds instead of minutes.

### Visibility and Positioning

Small things that matter enormously: the menu bar icon was hard to see on certain wallpapers, so it got a proper contrasted treatment. The floating watcher marks (the pawprint indicators that follow monitored windows) had positioning issues near screen edges, so they received boundary-aware clamping. The \`InputPill\` component for keyword entry was visually inconsistent across light and dark mode, so it got a unified style pass.

None of these changes would make a changelog exciting. All of them made the app feel *finished*.

### Why Friction Kills Developer Tools

Developer tools live or die by friction. A developer will abandon a tool that takes thirty seconds too long to configure, even if it saves them hours later. The threshold for "not worth it" is brutally low. Every unnecessary click, every ambiguous label, every visual glitch erodes trust.

The polish phase was about earning that trust -- not through features, but through respect for the user's time and attention. The best developer tools feel like they were made by someone who uses them every day. Because they were.`,
      zh: `### 不起眼的工作

在一天之内构建完 Shepherd 核心功能的冲刺之后，下一个阶段没有那么戏剧性，但可以说更重要：让它 **用起来** 对。功能再强大，如果用户用起来磕磕绊绊，就毫无价值。

### 一键窗口选择

最初的窗口选择器需要用户在想要监控的窗口上拖拽一个选择矩形。它能用，但很别扭。你得猜边界，处理重叠窗口，有时候还会选错区域。

解决方案是一个完整的 Mission Control 风格覆盖层。按下快捷键，Shepherd 将整个屏幕调暗，然后在你悬停时高亮每个窗口。点击一下，就开始监控。实现上使用 \`CGWindowListCopyWindowInfo\` 来枚举所有屏幕上的窗口，并用一个半透明的 overlay \`NSWindow\` 覆盖在所有内容之上来绘制悬停高亮。

一次点击代替拖拽瞄准。交互从"自己摸索"变成了"指一下就好"。

### 多关键词监控

第一个版本每个 watcher 只支持一个关键词。如果你想同时捕获 \`error\` 和 \`failed\`，你需要两个 watcher 指向同一个窗口。这种设计在 demo 里能用，但在实际使用中就崩了。

解决方案是逗号分隔的关键词：在一个输入框里输入 \`error, failed, crash, panic\`，Shepherd 就会监控所有这些词。再结合 **语义预设** ——为常见场景预构建的关键词集，比如 "Agent Coding" 或 "Build & Deploy"——现在设置监控只需要几秒，而不是几分钟。

### 可见性和定位

那些影响巨大的小事：menu bar 图标在某些壁纸上很难看清，所以做了适当的对比度处理。浮动的 watcher marks（跟随被监控窗口的爪印指示器）在屏幕边缘有定位问题，所以加入了边界感知的位置钳制。用于关键词输入的 \`InputPill\` 组件在 light mode 和 dark mode 下视觉不一致，所以做了统一的样式处理。

这些改动都不会让 changelog 变得激动人心。但它们都让应用感觉 **完整** 了。

### 为什么摩擦会杀死开发者工具

开发者工具的生死取决于摩擦。一个开发者会放弃一个配置多花三十秒的工具，即使它之后能帮他省下几个小时。"不值得用"的阈值低得残酷。每一次不必要的点击，每一个模糊的标签，每一个视觉上的小毛病，都在侵蚀信任。

打磨阶段的目的是赢得这份信任——不是通过功能，而是通过对用户时间和注意力的尊重。最好的开发者工具让人感觉是由一个每天都在使用它的人做出来的。因为确实如此。`,
    },
  },
  {
    id: 1,
    date: 'January 2026',
    category: 'Engineering',
    title: {
      en: 'From Zero to v3.1 in One Day',
      zh: '一天从零到 v3.1',
    },
    summary: {
      en: 'The genesis day: how Shepherd went from an empty Xcode project to a feature-rich v3.1 in a single intense day of building with Claude.',
      zh: '创世之日：Shepherd 如何在与 Claude 共同构建的紧张一天中，从一个空的 Xcode 项目变成功能丰富的 v3.1。',
    },
    content: {
      en: `### The Spark

It started with a simple frustration: I was running a long build process in Terminal, walked away to make coffee, and came back to find it had failed forty minutes ago. Forty minutes wasted. I wanted something that would just *watch* my terminal and ping me when things went wrong.

That was the morning of January 13, 2026. By midnight, Shepherd was at version 3.1.

### v1.0: The Basic Monitor

The first working version was crude but functional. Select a region of the screen, capture it periodically, and scan for keywords. I described the concept to Claude and within the first hour we had a menu bar app that could take a screenshot of a defined region and run basic text matching. It was ugly and it polled too aggressively, but it *worked*. That was v1.0.

### v2.0: Window Sticky

The problem with region-based monitoring is obvious: windows move. You drag your terminal to another monitor, and your watcher is staring at empty desktop. The fix was to bind watchers to **windows** instead of screen coordinates.

This is where macOS gets interesting. \`CGWindowListCopyWindowInfo\` gives you every on-screen window with its bounds, owner, and title. By tracking the window ID, Shepherd could follow a window wherever it went. The floating pawprint marks (our watcher indicators) now moved with their target window, updating position at 20 FPS with a lightweight \`CADisplayLink\`-style timer.

### v2.5: Smart Snap via Accessibility APIs

Following windows is good. *Snapping* to them is better. Using the macOS Accessibility framework (\`AXUIElement\`), Shepherd could read a window's exact position and size in real-time, even when partially occluded. This meant the watcher marks did not just follow -- they snapped to precise positions relative to the window frame, maintaining their offset even during resize operations.

Getting Accessibility permissions right was tricky. macOS gates these APIs behind explicit user consent in System Preferences, and the app needs to handle the case where permissions are granted, denied, or revoked at runtime. Claude nailed the permission flow on the first pass, including the fallback UI that guides users to the correct settings pane.

### v3.0: Audio Replay Buffer

This was the ambitious one. Using \`AVAudioEngine\`, Shepherd maintained a rolling audio capture buffer. When a keyword was detected in the terminal, it could save the last N seconds of system audio -- the idea being that you could replay what your AI coding agent was "saying" when an error occurred.

The audio pipeline involved setting up a tap on the system audio input, writing PCM frames to a circular buffer, and encoding to AAC on trigger. It worked, and it was technically impressive. (It also eventually got removed in the architecture pivot, but that is another post.)

### v3.1: Adaptive Frame Rate

The final feature of the day was smart resource management. Instead of always updating at 20 FPS, Shepherd now detected when a monitored window was idle (no position changes, no content changes) and throttled down to 4 FPS. When activity resumed, it ramped back up instantly. This kept CPU usage under 2% during idle periods.

### The Intensity

I want to be honest about what this day felt like. It was intense. Not in a grinding, exhausting way, but in the way a long jam session is intense for a musician. There was a momentum, a *flow*, where each feature landed and immediately suggested the next one. Claude kept up with every pivot, every "actually, what if we tried..." moment.

By midnight I had a macOS app that I would actually use every day. Not a prototype. Not a proof of concept. A real tool, built in a single day, with an AI that never got tired, never pushed back on a refactor, and never forgot the context of what we were building.

That was day one. Everything since has been refinement.`,
      zh: `### 灵感的火花

起因是一个简单的frustration：我在 Terminal 里跑一个长时间的 build 过程，走开去泡咖啡，回来发现它四十分钟前就失败了。白白浪费了四十分钟。我想要一个东西能 **盯着** 我的终端，在出问题的时候提醒我。

那是 2026 年 1 月 13 日的早上。到午夜时分，Shepherd 已经到了 v3.1。

### v1.0：基础监控器

第一个能工作的版本很粗糙但能用。选择屏幕上的一个区域，定期捕获，扫描关键词。我向 Claude 描述了这个概念，在第一个小时内我们就有了一个 menu bar app，能够截取指定区域的截图并进行基本的文本匹配。它很丑，轮询也太频繁了，但它 **能用**。这就是 v1.0。

### v2.0：窗口吸附

基于区域监控的问题很明显：窗口会移动。你把终端拖到另一个显示器，你的 watcher 就在盯着空桌面了。解决方案是把 watcher 绑定到 **窗口** 而不是屏幕坐标。

这里 macOS 变得有趣了。\`CGWindowListCopyWindowInfo\` 能给你屏幕上每个窗口的边界、所有者和标题。通过追踪 window ID，Shepherd 可以跟随窗口去任何地方。浮动的爪印标记（我们的 watcher 指示器）现在会跟随目标窗口移动，使用一个轻量级的类 \`CADisplayLink\` 定时器以 20 FPS 更新位置。

### v2.5：通过 Accessibility API 实现智能贴靠

跟随窗口是好的。**贴靠** 到窗口更好。利用 macOS Accessibility 框架（\`AXUIElement\`），Shepherd 可以实时读取窗口的精确位置和大小，即使窗口被部分遮挡也不影响。这意味着 watcher marks 不只是跟随——它们会精确贴靠到相对于窗口框架的位置，在窗口调整大小时也能保持偏移量。

正确处理 Accessibility 权限很棘手。macOS 将这些 API 放在 System Preferences 中明确的用户授权之后，而且应用需要处理权限在运行时被授予、拒绝或撤销的情况。Claude 在第一次尝试就搞定了权限流程，包括引导用户到正确设置面板的 fallback UI。

### v3.0：音频回放缓冲区

这是最有野心的一个。使用 \`AVAudioEngine\`，Shepherd 维护一个滚动的音频捕获缓冲区。当在终端中检测到关键词时，它可以保存最后 N 秒的系统音频——想法是你可以回放当错误发生时你的 AI 编程 agent 正在"说"什么。

音频 pipeline 涉及在系统音频输入上设置 tap，将 PCM 帧写入循环缓冲区，并在触发时编码为 AAC。它能工作，技术上也很impressive。（它后来在架构转向中被移除了，但那是另一篇文章的事。）

### v3.1：自适应帧率

那天的最后一个功能是智能资源管理。Shepherd 不再始终以 20 FPS 更新，而是检测被监控窗口何时处于空闲状态（没有位置变化，没有内容变化），然后降频到 4 FPS。当活动恢复时，立即回到全速。这使得空闲期间 CPU 使用率保持在 2% 以下。

### 那天的感受

我想诚实地说说那天是什么感觉。很intense。不是那种磨人的、精疲力竭的方式，而是像一个音乐人在一场长时间即兴演奏中的那种 intense。有一种势头，一种 **心流**，每个功能落地后立刻暗示着下一个。Claude 跟上了每一次转向，每一个"等一下，如果我们试试这样呢……"的时刻。

到午夜时分，我有了一个我真的会每天使用的 macOS 应用。不是原型，不是概念验证。一个真正的工具，在一天之内构建完成，和一个不会疲倦、不会抗拒重构、不会忘记我们在构建什么的 AI 一起。

那是第一天。此后的一切都是精炼。`,
    },
  },
];

export const journeyPostsByLanguage = {
  en: localizedJourneyPosts.map((p) => ({
    ...p,
    title: p.title.en,
    summary: p.summary.en,
    content: p.content.en,
  })),
  zh: localizedJourneyPosts.map((p) => ({
    ...p,
    title: p.title.zh,
    summary: p.summary.zh,
    content: p.content.zh,
  })),
};
