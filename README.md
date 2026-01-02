<div align="center">

# 🔮 PolyLens

### *See History Through Every Perspective*

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Groq](https://img.shields.io/badge/Groq-API-F55036?style=for-the-badge&logo=groq&logoColor=white)](https://groq.com/)
[![Vercel](https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)

[![License](https://img.shields.io/badge/License-MIT-green.svg?style=flat-square)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg?style=flat-square)](https://github.com/harshwardhan-kp/PolyLens/graphs/commit-activity)

<br/>

**A multi-perspective historical narrative platform that presents historical events through the lens of different countries, communities, religions, ideologies, and academic viewpoints — all side by side.**

[View Demo](https://poly-lens.vercel.app) · [Report Bug](https://github.com/harshwardhan-kp/PolyLens/issues) · [Request Feature](https://github.com/harshwardhan-kp/PolyLens/issues)

<br/>

---

</div>

## ✨ Features

<table>
<tr>
<td width="50%">

### 🎭 Multi-Perspective Analysis
Get **5+ unique perspectives** on any historical event — from different countries, communities, religions, and academic schools of thought.

### 🌓 Theme Support
Beautiful **light and dark modes** with system preference detection for comfortable viewing.

### ⚡ Real-time Streaming
Powered by **Groq's ultra-fast inference** delivering responses at ~500 tokens/second.

</td>
<td width="50%">

### 🎨 Modern UI/UX
Clean, **ChatGPT-inspired interface** with horizontal card carousel for easy comparison.

### 📱 Fully Responsive
Seamless experience across **desktop, tablet, and mobile** devices.

### 🔒 Source-Backed
Every perspective includes **academic sources** and bias acknowledgments for transparency.

</td>
</tr>
</table>

<br/>

## 🖼️ Screenshots

<div align="center">
<table>
<tr>
<td align="center"><strong>Light Theme</strong></td>
<td align="center"><strong>Dark Theme</strong></td>
</tr>
<tr>
<td><img src="https://via.placeholder.com/400x300/f7f7f8/1a1a1a?text=Light+Mode" alt="Light Theme"/></td>
<td><img src="https://via.placeholder.com/400x300/0f0f0f/f0f0f0?text=Dark+Mode" alt="Dark Theme"/></td>
</tr>
</table>
</div>

<br/>

## 🛠️ Tech Stack

<div align="center">

### Core Technologies

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)

### AI & APIs

![Groq](https://img.shields.io/badge/Groq-F55036?style=for-the-badge&logo=groq&logoColor=white)
![Vercel AI SDK](https://img.shields.io/badge/Vercel_AI_SDK-000000?style=for-the-badge&logo=vercel&logoColor=white)

### Deployment & Infrastructure

![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)

</div>

<br/>

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ 
- **npm** or **yarn**
- **Groq API Key** ([Get one free](https://console.groq.com/))

### Installation

```bash
# Clone the repository
git clone https://github.com/harshwardhan-kp/PolyLens.git

# Navigate to project directory
cd PolyLens

# Install dependencies
npm install

# Create environment file
echo "GROQ_API_KEY=your_groq_api_key_here" > .env.local

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser 🎉

<br/>

## 📁 Project Structure

```
PolyLens/
├── 📂 app/
│   ├── 📂 api/
│   │   └── 📂 chat/
│   │       └── 📄 route.ts      # Groq API endpoint
│   ├── 📄 page.tsx              # Main chat interface
│   ├── 📄 page.module.css       # Component styles
│   ├── 📄 layout.tsx            # Root layout
│   └── 📄 globals.css           # Design system
├── 📂 lib/
│   └── 📄 prompts.ts            # AI prompts & types
├── 📄 .env.local                # Environment variables
├── 📄 package.json
└── 📄 README.md
```

<br/>

## 🔮 Future Roadmap

<div align="center">

### Phase 2: Enhanced Data Layer

![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![Redis](https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)

### Phase 3: Authentication & Users

![NextAuth.js](https://img.shields.io/badge/NextAuth.js-000000?style=for-the-badge&logo=next.js&logoColor=white)
![Google](https://img.shields.io/badge/Google_OAuth-4285F4?style=for-the-badge&logo=google&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)

### Phase 4: Infrastructure & Scale

![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Kubernetes](https://img.shields.io/badge/Kubernetes-326CE5?style=for-the-badge&logo=kubernetes&logoColor=white)
![AWS](https://img.shields.io/badge/AWS-232F3E?style=for-the-badge&logo=amazon-aws&logoColor=white)
![Google Cloud](https://img.shields.io/badge/Google_Cloud-4285F4?style=for-the-badge&logo=google-cloud&logoColor=white)

### Phase 5: Advanced Features

![OpenAI](https://img.shields.io/badge/OpenAI-412991?style=for-the-badge&logo=openai&logoColor=white)
![Elasticsearch](https://img.shields.io/badge/Elasticsearch-005571?style=for-the-badge&logo=elasticsearch&logoColor=white)
![GraphQL](https://img.shields.io/badge/GraphQL-E10098?style=for-the-badge&logo=graphql&logoColor=white)
![Stripe](https://img.shields.io/badge/Stripe-008CDD?style=for-the-badge&logo=stripe&logoColor=white)

</div>

<br/>

### Planned Features

| Feature | Description | Status |
|---------|-------------|--------|
| 💾 **Save Conversations** | Persist chat history to database | 🔜 Planned |
| 👤 **User Accounts** | Authentication with Google/GitHub | 🔜 Planned |
| 📊 **Analytics Dashboard** | Track popular queries and perspectives | 🔜 Planned |
| 🌍 **Multi-language** | Support for 10+ languages | 🔜 Planned |
| 📱 **Mobile App** | Native iOS/Android with React Native | 🔜 Planned |
| 🎯 **Custom Perspectives** | User-defined viewpoint categories | 🔜 Planned |
| 📚 **Source Links** | Direct links to academic papers | 🔜 Planned |
| 🤖 **Multiple LLMs** | Switch between GPT-4, Claude, Gemini | 🔜 Planned |

<br/>

## 🤝 Contributing

Contributions are what make the open source community amazing! Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<br/>

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

<br/>

## 👨‍💻 Author

<div align="center">

**Harshwardhan KP**

[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/harshwardhan-kp)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/harshwardhan-kp)
[![Twitter](https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/harshwardhan_kp)

</div>

<br/>

---

<div align="center">

### ⭐ Star this repo if you find it useful!

**Made with ❤️ for the GDG Community**

<br/>

![Visitors](https://api.visitorbadge.io/api/visitors?path=harshwardhan-kp%2FPolyLens&countColor=%2310a37f)

</div>
