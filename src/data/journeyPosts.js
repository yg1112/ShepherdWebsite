const localizedJourneyPosts = [
  {
    id: 4,
    date: 'March 2026',
    category: 'Product',
    title: {
      en: 'Six Weeks of Dogfooding',
      zh: '六周的自我使用',
    },
    summary: {
      en: 'We used Shepherd every day for six weeks. Then we rewrote 3,500 lines of it. Here is what daily use teaches you that specs never will.',
      zh: '我们每天使用 Shepherd 六周后，重写了 3,500 行代码。日常使用能教你的东西，需求文档永远教不了。',
    },
    content: {
      en: `### The Quiet Period

Between mid-January and early March 2026, the commit history goes silent. No new features, no refactors. Just silence. But that silence was not inactivity. It was the most important phase of Shepherd's development: **using it every day and writing down everything that annoyed me.**

Six weeks of running Shepherd as my daily driver, monitoring terminal builds, long-running scripts, and coding agent sessions. Six weeks of living with every rough edge.

### What Daily Use Revealed

Some things looked fine in a demo but failed in real workflows:

- **The settings panel was buried.** Configuring a new watcher required too many steps. You had to open settings, create a watcher, pick a window, type keywords, set severity -- all in separate screens. When you are in the middle of a build and want to quickly start watching something, five clicks is four too many.
- **The window picker felt disconnected.** It lived in a separate modal. You would trigger it, pick a window, then go back to configure it. The mental model was fractured: "configure first, then target" when the natural instinct is "point at something, then configure."
- **The permissions flow was confusing.** First-time users did not understand why Accessibility permission was needed or where to grant it. The app just... did not work, with no clear guidance on what to do next.
- **Visual density was wrong.** The menu bar popover showed too little information at a glance. You could not see the status of all your watchers without scrolling. For a monitoring tool, glanceability is everything.

### The March Rewrite

On March 2, I sat down and rewrote nearly everything the user touches. The diff tells the story: **+3,570 lines, -720 lines, across 16 files.** The core monitoring engine stayed the same. Everything around it changed.

The new \`WindowPickerView\` (+668 lines) was built from scratch. Instead of a separate modal, it is now an inline experience. You see a live grid of all your windows, hover to preview, click to select. Then the keyword configuration appears right there -- no context switch.

\`SettingsView\` went from a basic preferences panel to a full dashboard (+540 lines). At a glance you see every active watcher, its status, its last trigger time, and quick controls. The information hierarchy was redesigned: the most important things (is it running? did it trigger?) are visible without any interaction.

The permissions panel got a complete rewrite. Now there is a clear, step-by-step onboarding flow: here is what the permission does, here is exactly where to enable it, and here is a button that opens the right System Settings pane directly. No more guessing.

### The Tradeoff: Ship Fast vs. Ship Right

There is a tension in product development between velocity and polish. The January sprint proved we could build fast. The March rewrite proved that speed means nothing if the experience is rough.

The tradeoff we chose: **build the engine fast, but take your time with the cockpit.** The monitoring logic, the window tracking, the keyword matching -- those can be built quickly because correctness is binary. It either works or it does not. But the interface between the tool and the human? That requires patience. You have to use it, feel the friction, sleep on it, come back, and ask "why did I just hesitate there?"

### What Changed in My Thinking

Before this project, I would have shipped the January version and iterated based on user feedback. Now I believe something different: **the best feedback comes from being your own most demanding user.** Not because external feedback is not valuable, but because you can feel friction at a resolution that no bug report can capture. The half-second hesitation before clicking something. The slight confusion about which button does what. The muscle memory that never quite develops because the layout is 10 pixels off.

Those six quiet weeks were not a pause. They were the foundation.`,
      zh: `### 安静的时期

2026 年 1 月中旬到 3 月初之间，commit 历史一片安静。没有新功能，没有重构。只有沉默。但这段沉默不是无所事事。它是 Shepherd 开发中最重要的阶段：**每天使用它，并把所有让我烦躁的地方记下来。**

六周时间，我把 Shepherd 当作日常工具，监控终端构建、长时间运行的脚本和编程 agent 会话。六周时间，和每一个粗糙的棱角共处。

### 日常使用揭示了什么

有些东西在 demo 里看起来不错，但在真实工作流中就暴露了：

- **设置面板藏得太深。** 配置一个新的 watcher 需要太多步骤。你得打开设置、创建 watcher、选择窗口、输入关键词、设置严重级别——全在不同的页面。当你正在跑 build，想快速监控某个东西时，五次点击就有四次是多余的。
- **窗口选择器感觉脱节。** 它在一个独立的弹窗里。你触发它、选择窗口，然后回去配置。心理模型是割裂的："先配置，再指定目标"，但直觉告诉你应该"先指着某个东西，再配置。"
- **权限引导很混乱。** 首次用户不理解为什么需要 Accessibility 权限，也不知道在哪里授权。应用就是……不能用，没有任何清晰的引导告诉你下一步该做什么。
- **信息密度不对。** 菜单栏弹出窗口在一眼之间显示的信息太少。你没法不滚动就看到所有 watcher 的状态。对于监控工具来说，一瞥可达至关重要。

### 三月的重写

3 月 2 日，我坐下来重写了几乎所有用户能接触到的界面。diff 说明了一切：**+3,570 行，-720 行，横跨 16 个文件。** 核心监控引擎保持不变。围绕它的一切都变了。

全新的 \`WindowPickerView\`（+668 行）从零开始构建。不再是独立的弹窗，而是内联体验。你能看到所有窗口的实时网格，悬停预览，点击选择。然后关键词配置就在那里出现——没有上下文切换。

\`SettingsView\` 从一个基础的设置面板变成了一个完整的仪表盘（+540 行）。一眼就能看到每个活跃的 watcher、它的状态、上次触发时间和快捷控制。信息层级被重新设计：最重要的东西（它在运行吗？触发了吗？）无需任何操作就能看到。

权限面板做了完整重写。现在有一个清晰的分步引导流程：这个权限是做什么的，在哪里开启，还有一个按钮可以直接打开正确的系统设置页面。不用再猜了。

### 取舍：快速发布 vs. 正确发布

产品开发中有一种张力：速度与打磨之间的平衡。一月的冲刺证明了我们能快速构建。三月的重写证明了，如果体验粗糙，速度毫无意义。

我们选择的取舍：**引擎可以快速构建，但驾驶舱要慢慢打磨。** 监控逻辑、窗口追踪、关键词匹配——这些可以快速构建，因为正确性是二元的：要么能用，要么不能。但工具与人之间的界面？那需要耐心。你得使用它，感受摩擦，睡一觉，回来再问自己"我刚才为什么在那里犹豫了？"

### 思维的变化

在这个项目之前，我会直接发布一月的版本，然后根据用户反馈迭代。现在我相信另一件事：**最好的反馈来自成为你自己最苛刻的用户。** 不是因为外部反馈不有价值，而是因为你能以 bug 报告永远无法捕捉的精度感受到摩擦。点击某个东西前那半秒的犹豫。对哪个按钮做什么的微小困惑。因为布局偏了 10 个像素而始终无法形成的肌肉记忆。

那六周的安静不是暂停，而是根基。`,
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
      en: 'Why we removed local Whisper and OCR in favor of native macOS APIs. Sometimes the best feature is the one you delete.',
      zh: '为什么我们移除了本地 Whisper 和 OCR，转向原生 macOS API。有时候最好的功能就是你删掉的那个。',
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
- **OCR fragility**: Screenshot-based OCR works until it does not. Font rendering, terminal themes, retina scaling, split panes -- every edge case is another failure mode.
- **Privacy perception**: Even though everything ran locally, the *idea* of an app capturing audio and taking screenshots made people uncomfortable. Perception matters as much as reality.

### The Native Alternative

Here is what replaced all of that complexity: **AppleScript**.

macOS has a built-in mechanism for reading text content from application windows. A simple \`tell application "Terminal" to get contents of selected tab of front window\` returns the actual text buffer. No screenshots. No pixel analysis. No ML models. Just the text, directly from the source.

It is faster, more reliable, uses essentially zero CPU, and requires only Accessibility permissions that developers already grant to their tools. The code went from hundreds of lines of audio/image processing to a handful of AppleScript bridge calls.

**Less code. Fewer permissions. Better results.** This is the tradeoff that defined Shepherd's architecture.

### Adding Remote Supervision

With local processing simplified, there was room to add something genuinely new: **remote supervision via Cloudflare Workers**.

The idea is straightforward. When Shepherd detects a keyword match locally, it can forward a lightweight alert to a Worker endpoint. From there, you get Telegram notifications, a web dashboard, and the ability to send commands back to your machine. This gives you awareness even when you are away from your desk -- which is the entire point of a monitoring tool.

The Worker is minimal: a few hundred lines of TypeScript, deployed to the edge, costing essentially nothing to run. It complements the local-first architecture instead of replacing it. Your monitoring data stays ephemeral -- events auto-expire in 24 hours, and no persistent database is involved.

The tradeoff was explicit: **trade local ML complexity for a thin, stateless cloud relay.** Less CPU, fewer permissions, and you gain remote awareness. For a developer tool that should be lightweight and always-on, this was the right call.

### The Lesson

Engineers love adding capabilities. It feels productive. But the discipline of product craft is knowing when a feature, even a working one, does not belong. Shepherd got faster, simpler, and more trustworthy by subtracting. The architecture pivot was not a failure of the original design. It was a refinement. The best version of a product is often hiding underneath the features you are brave enough to remove.`,
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

**更少的代码，更少的权限，更好的结果。** 这就是定义 Shepherd 架构的那个取舍。

### 加入远程监控

本地处理简化后，有了空间去加入真正有价值的新功能：**通过 Cloudflare Workers 的远程监控**。

思路很直接。当 Shepherd 在本地检测到关键词匹配时，它可以向 Worker 端点转发一个轻量级的告警。从那里，你可以收到 Telegram 通知、查看 Web 仪表盘，还能向你的机器发送指令。这让你即使不在电脑前也能保持感知——这本来就是监控工具的全部意义。

Worker 非常精简：几百行 TypeScript，部署在边缘节点，运行成本几乎为零。它补充了本地优先的架构，而不是替代它。你的监控数据保持短暂——事件在 24 小时后自动过期，不涉及持久化数据库。

取舍是明确的：**用本地 ML 的复杂度换一个轻薄的、无状态的云端中继。** 更少的 CPU 占用，更少的权限，换来远程感知能力。对于一个应该轻量且始终运行的开发工具来说，这是正确的选择。

### 启示

工程师喜欢添加能力，这感觉很有生产力。但产品工艺的纪律在于，知道一个功能——即使它能工作——什么时候不属于这个产品。Shepherd 通过做减法变得更快、更简单、更值得信赖。架构转向不是原始设计的失败，而是精炼。一个产品最好的版本，往往藏在你有勇气移除的那些功能之下。`,
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

After the initial sprint of building Shepherd's core, the next phase was less dramatic but arguably more important: making it *feel* right. Features are worthless if people fumble through using them.

### One-Click Window Selection

The original window picker required users to drag a selection rectangle over the window they wanted to monitor. It worked, but it was awkward. You had to guess the boundaries, deal with overlapping windows, and sometimes you would select the wrong region entirely.

The fix was a full Mission Control-style overlay. Hit the hotkey, and Shepherd dims the entire screen, then highlights each window as you hover over it. Click once, and you are monitoring. The implementation uses \`CGWindowListCopyWindowInfo\` to enumerate all on-screen windows and draws hover highlights with a semi-transparent overlay \`NSWindow\` layered above everything.

One click instead of a drag-and-aim. The interaction went from "figure it out" to "just point."

### Multi-Keyword Monitoring

The first version supported a single keyword per watcher. If you wanted to catch both \`error\` and \`failed\`, you needed two watchers pointed at the same window. That is the kind of design that works in a demo but falls apart in real use.

The solution was comma-separated keywords: type \`error, failed, crash, panic\` into one field, and Shepherd watches for all of them. Combined with **semantic presets** -- pre-built keyword sets for common scenarios like "Agent Coding" or "Build & Deploy" -- setting up monitoring now takes seconds instead of minutes.

This is a tradeoff worth calling out: we could have built a complex rule engine with boolean logic, regex patterns, and priority weights. Instead we went with the simplest thing that solves 95% of use cases. A comma. The remaining 5% can wait until real users ask for it.

### Visibility and Positioning

Small things that matter enormously: the menu bar icon was hard to see on certain wallpapers, so it got a proper contrasted treatment. The floating watcher marks (the pawprint indicators that follow monitored windows) had positioning issues near screen edges, so they received boundary-aware clamping. The \`InputPill\` component for keyword entry was visually inconsistent across light and dark mode, so it got a unified style pass.

None of these changes would make a changelog exciting. All of them made the app feel *finished*.

### Why Friction Kills Developer Tools

Developer tools live or die by friction. A developer will abandon a tool that takes thirty seconds too long to configure, even if it saves them hours later. The threshold for "not worth it" is brutally low. Every unnecessary click, every ambiguous label, every visual glitch erodes trust.

The polish phase was about earning that trust -- not through features, but through respect for the user's time and attention. The best developer tools feel like they were made by someone who uses them every day. Because they were.`,
      zh: `### 不起眼的工作

在 Shepherd 核心功能的初始冲刺之后，下一个阶段没有那么戏剧性，但可以说更重要：让它 **用起来** 对。功能再强大，如果用户用起来磕磕绊绊，就毫无价值。

### 一键窗口选择

最初的窗口选择器需要用户在想要监控的窗口上拖拽一个选择矩形。它能用，但很别扭。你得猜边界，处理重叠窗口，有时候还会选错区域。

解决方案是一个完整的 Mission Control 风格覆盖层。按下快捷键，Shepherd 将整个屏幕调暗，然后在你悬停时高亮每个窗口。点击一下，就开始监控。实现上使用 \`CGWindowListCopyWindowInfo\` 来枚举所有屏幕上的窗口，并用一个半透明的 overlay \`NSWindow\` 覆盖在所有内容之上来绘制悬停高亮。

一次点击代替拖拽瞄准。交互从"自己摸索"变成了"指一下就好"。

### 多关键词监控

第一个版本每个 watcher 只支持一个关键词。如果你想同时捕获 \`error\` 和 \`failed\`，你需要两个 watcher 指向同一个窗口。这种设计在 demo 里能用，但在实际使用中就崩了。

解决方案是逗号分隔的关键词：在一个输入框里输入 \`error, failed, crash, panic\`，Shepherd 就会监控所有这些词。再结合 **语义预设** ——为常见场景预构建的关键词集，比如 "Agent Coding" 或 "Build & Deploy"——现在设置监控只需要几秒，而不是几分钟。

这里有一个值得说的取舍：我们可以构建一个复杂的规则引擎，支持布尔逻辑、正则表达式和优先级权重。但我们选择了最简单的方案来解决 95% 的用例：一个逗号。剩下的 5% 可以等到真正有用户提出需求再说。

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
      en: 'The genesis sprint: how Shepherd went from a frustration with missed terminal errors to a working v3.1 in a single intense day.',
      zh: '创世冲刺：Shepherd 如何从一次错过终端报错的frustration，在紧张的一天内变成了 v3.1。',
    },
    content: {
      en: `### The Spark

It started with a simple frustration: I was running a long build process in Terminal, walked away to make coffee, and came back to find it had failed forty minutes ago. Forty minutes wasted. I wanted something that would just *watch* my terminal and ping me when things went wrong.

That was the morning of January 13, 2026. By midnight, Shepherd was at version 3.1.

### v1.0: The Basic Monitor

The first working version was crude but functional. Select a region of the screen, capture it periodically, and scan for keywords. Within the first hour there was a menu bar app that could take a screenshot of a defined region and run basic text matching. It was ugly and it polled too aggressively, but it *worked*. That was v1.0.

The decision to start with screen region capture was deliberate. It was the simplest possible approach -- no special APIs, no permissions dance, just "look at this rectangle of pixels." Getting something running fast matters more than getting it right on the first try.

### v2.0: Window Sticky

The problem with region-based monitoring is obvious: windows move. You drag your terminal to another monitor, and your watcher is staring at empty desktop. The fix was to bind watchers to **windows** instead of screen coordinates.

This is where macOS gets interesting. \`CGWindowListCopyWindowInfo\` gives you every on-screen window with its bounds, owner, and title. By tracking the window ID, Shepherd could follow a window wherever it went. The floating pawprint marks (our watcher indicators) now moved with their target window, updating position at 20 FPS with a lightweight \`CADisplayLink\`-style timer.

The tradeoff: 20 FPS polling uses more CPU than event-driven updates. But macOS does not offer window-move notifications for arbitrary third-party windows. The alternative -- hooking into the Accessibility API for position change events -- was more complex and less reliable across different app architectures. Polling at 20 FPS costs about 1-2% CPU and "just works" for every window. We took the pragmatic path.

### v2.5: Smart Snap via Accessibility APIs

Following windows is good. *Snapping* to them is better. Using the macOS Accessibility framework (\`AXUIElement\`), Shepherd could read a window's exact position and size in real-time, even when partially occluded. This meant the watcher marks did not just follow -- they snapped to precise positions relative to the window frame, maintaining their offset even during resize operations.

Getting Accessibility permissions right was tricky. macOS gates these APIs behind explicit user consent in System Preferences, and the app needs to handle the case where permissions are granted, denied, or revoked at runtime. The permission flow includes a fallback UI that guides users to the correct settings pane -- because "please enable Accessibility" with no context is a dead end for most users.

### v3.0: Audio Replay Buffer

This was the ambitious one. Using \`AVAudioEngine\`, Shepherd maintained a rolling audio capture buffer. When a keyword was detected in the terminal, it could save the last N seconds of system audio -- the idea being that you could replay what was happening when an error occurred.

The audio pipeline involved setting up a tap on the system audio input, writing PCM frames to a circular buffer, and encoding to AAC on trigger. It worked, and it was technically interesting. (It also eventually got removed in the architecture pivot -- but that is another post. Sometimes the most valuable thing you build is the thing that teaches you what *not* to ship.)

### v3.1: Adaptive Frame Rate

The final feature of the day was smart resource management. Instead of always updating at 20 FPS, Shepherd now detected when a monitored window was idle (no position changes, no content changes) and throttled down to 4 FPS. When activity resumed, it ramped back up instantly. This kept CPU usage under 2% during idle periods.

This was a non-negotiable requirement from the start: a menu bar monitoring tool that eats your battery is a monitoring tool you uninstall. The adaptive frame rate was the difference between "technically works" and "works all day without you noticing."

### The Intensity

I want to be honest about what this day felt like. It was intense. Not in a grinding, exhausting way, but in the way a long jam session is intense for a musician. There was a momentum, a *flow*, where each feature landed and immediately suggested the next one. Every problem solved revealed the next interesting problem.

By midnight I had a macOS app that I would actually use every day. Not a prototype. Not a proof of concept. A real tool, built from genuine frustration, shaped by real tradeoffs.

That was day one. Everything since has been refinement.`,
      zh: `### 灵感的火花

起因是一个简单的 frustration：我在 Terminal 里跑一个长时间的 build 过程，走开去泡咖啡，回来发现它四十分钟前就失败了。白白浪费了四十分钟。我想要一个东西能 **盯着** 我的终端，在出问题的时候提醒我。

那是 2026 年 1 月 13 日的早上。到午夜时分，Shepherd 已经到了 v3.1。

### v1.0：基础监控器

第一个能工作的版本很粗糙但能用。选择屏幕上的一个区域，定期捕获，扫描关键词。在第一个小时内就有了一个 menu bar app，能够截取指定区域的截图并进行基本的文本匹配。它很丑，轮询也太频繁了，但它 **能用**。这就是 v1.0。

选择从屏幕区域截图开始是刻意的。它是最简单的方案——不需要特殊 API，不需要权限流程，只是"看这个像素矩形"。快速让东西跑起来比第一次就做对更重要。

### v2.0：窗口吸附

基于区域监控的问题很明显：窗口会移动。你把终端拖到另一个显示器，你的 watcher 就在盯着空桌面了。解决方案是把 watcher 绑定到 **窗口** 而不是屏幕坐标。

这里 macOS 变得有趣了。\`CGWindowListCopyWindowInfo\` 能给你屏幕上每个窗口的边界、所有者和标题。通过追踪 window ID，Shepherd 可以跟随窗口去任何地方。浮动的爪印标记（我们的 watcher 指示器）现在会跟随目标窗口移动，使用一个轻量级的类 \`CADisplayLink\` 定时器以 20 FPS 更新位置。

取舍：20 FPS 轮询比事件驱动更新消耗更多 CPU。但 macOS 不为任意第三方窗口提供窗口移动通知。替代方案——通过 Accessibility API hook 位置变化事件——更复杂，而且在不同应用架构下可靠性较差。20 FPS 轮询大约消耗 1-2% CPU，对每个窗口都"就是能用"。我们选择了务实的路线。

### v2.5：通过 Accessibility API 实现智能贴靠

跟随窗口是好的。**贴靠** 到窗口更好。利用 macOS Accessibility 框架（\`AXUIElement\`），Shepherd 可以实时读取窗口的精确位置和大小，即使窗口被部分遮挡也不影响。这意味着 watcher marks 不只是跟随——它们会精确贴靠到相对于窗口框架的位置，在窗口调整大小时也能保持偏移量。

正确处理 Accessibility 权限很棘手。macOS 将这些 API 放在系统设置中明确的用户授权之后，而且应用需要处理权限在运行时被授予、拒绝或撤销的情况。权限流程包含一个引导用户到正确设置面板的 fallback UI——因为"请开启 Accessibility 权限"不加任何上下文，对大多数用户来说就是死路一条。

### v3.0：音频回放缓冲区

这是最有野心的一个。使用 \`AVAudioEngine\`，Shepherd 维护一个滚动的音频捕获缓冲区。当在终端中检测到关键词时，它可以保存最后 N 秒的系统音频——想法是你可以回放错误发生时正在发生什么。

音频 pipeline 涉及在系统音频输入上设置 tap，将 PCM 帧写入循环缓冲区，并在触发时编码为 AAC。它能工作，技术上也很有意思。（它后来在架构转向中被移除了——但那是另一篇文章的事。有时候你构建的最有价值的东西，就是那个教你 **什么不该发布** 的东西。）

### v3.1：自适应帧率

那天的最后一个功能是智能资源管理。Shepherd 不再始终以 20 FPS 更新，而是检测被监控窗口何时处于空闲状态（没有位置变化，没有内容变化），然后降频到 4 FPS。当活动恢复时，立即回到全速。这使得空闲期间 CPU 使用率保持在 2% 以下。

这从一开始就是不可谈判的要求：一个吃电池的 menu bar 监控工具就是一个你会卸载的监控工具。自适应帧率是"技术上能用"和"用一整天都不会注意到"之间的差别。

### 那天的感受

我想诚实地说说那天是什么感觉。很 intense。不是那种磨人的、精疲力竭的方式，而是像一个音乐人在一场长时间即兴演奏中的那种 intense。有一种势头，一种 **心流**，每个功能落地后立刻暗示着下一个。每个解决的问题都揭示了下一个有趣的问题。

到午夜时分，我有了一个我真的会每天使用的 macOS 应用。不是原型，不是概念验证。一个真正的工具，源于真实的 frustration，在真实的取舍中成型。

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
