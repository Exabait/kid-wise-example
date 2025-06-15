# Kid-Wise

A minimal Next.js app to help parents explain words/concepts to young children (ages 3–7) using AI.

## Project goals

- Implement serverless solution. Here, I use Supabase for auth, db and storage
- Try to implement API of any LLM model. For generate word’s explanation I use OpenAI API
- Develop Next.js app with layered structure.
- Complete this project. Ready is more important than perfect

## Features

- Simple explanations, examples of usage, and game ideas for any word
- Mobile-first, clean UI
- OpenAI-powered (GPT-3.5 for free, GPT-4 for paid)

## Getting Started

1. **Install dependencies:**

   ```bash
   npm install
   # or
   yarn install
   ```

2. **Set up environment variables:**
   Create a `.env.local` file in the root:

   ```env
   OPENAI_API_KEY=sk-...
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
   STRIPE_SECRET_KEY=sk_test_...
   SUPABASE_URL=your-supabase-url
   SUPABASE_ANON_KEY=your-supabase-anon-key
   # or Clerk keys if using Clerk
   ```

3. **Run the development server:**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Visit** [http://localhost:3000](http://localhost:3000) (will be updated when prod version is released)

## Project Structure

- `app/` — App Router pages. Mainly client-side part with UI
- `src/` — All background procceses separated by technical layers
- `di` - Implementation of dependency injection. In this place you register layer's entities
