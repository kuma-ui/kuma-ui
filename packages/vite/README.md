<div align="center">
  <img src="https://raw.githubusercontent.com/kuma-ui/kuma-ui/main/media/logo.webp" alt="Kuma UI logo" width="300" />
</div>

<h1 align='center'>Ultra Fast, Zero Runtime, Headless UI Components</h1>

**[Documentation](https://kuma-ui.com)**

 <div>
    <a href='https://www.npmjs.com/package/@kuma-ui/core'>
      <img src='https://img.shields.io/npm/v/@kuma-ui/core'>
    </a>
    <a href='https://bundlephobia.com/package/@kuma-ui/core'>
      <img src='https://img.shields.io/bundlephobia/minzip/@kuma-ui/core'>
    </a>
  </div>
  <br />
</div>

## 🐻‍❄️ Features

- ⚡ **Zero-runtime**: Deliver blazing-fast websites with zero-runtime CSS extraction.

- 🔮 **Autocomplete**: Experience seamless development with style autocompletion.

- 🛠️ **Headless Components**: Enjoy maximum customization freedom with our headless components.

- 🤝 **Hybrid Approach**: The best of both worlds—support for any writing style with our hybrid approach.

- 🚀 **RSC Support**: Stay updated with cutting-edge Next.js technology via our RSC support.

- 🥇 **Familiar DX** : Delight in the ultimate DX with our familiar API design.

## 💻 Installation

```sh
npm install @kuma-ui/core
```

For installation instructions and more detailed information, please visit our [documentation](https://www.kuma-ui.com/docs/install). Be sure to check out our guide for setting up Kuma UI with your specific framework (Next.js or Vite).


## 🔫 Example

```tsx
function App() {
  return (
    <Box as="main" display="flex" flexDir={["column", "row"]}>
      <Heading
        as="h3"
        className={css`
          color: red;
          @media (max-width: sm) {
            color: blue;
          }
        `}
      >
        Kuma UI
      </Heading>
      <Spacer size={4} />
      <Flex flexDir={`column`}>
        <Text as="p" fontSize={24}>
          Headless UI Component Library
        </Text>
        <Button variant='primary'>Getting Started</Button>
      </Flex>
    </Box>
  );
}
```

## 👥 Join the Community

Connect with us on [Twitter](https://twitter.com/kuma__ui) and [Discord](https://discord.gg/QrsQ4EPp7G) to stay up to date with our latest developments, or to provide us with your valuable feedback!

Welcome to Kuma UI, we can't wait to see what you build with it 🐻‍❄️.