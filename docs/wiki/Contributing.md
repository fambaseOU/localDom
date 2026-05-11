# 🤝 Contributing to LocalDom

We love contributions! Whether you're fixing a bug, adding a new engine discovery, or improving the dashboard, your help is welcome.

## 🛠️ Development Setup

1.  **Fork and Clone** the repository.
2.  **Install dependencies**: `npm install`.
3.  **Run in Dev Mode**:
    ```bash
    npm run dev
    ```
    This starts the Relay and the Vite dev server with Hot Module Replacement (HMR).

## 🌿 Branching Strategy

- **`main`**: Production-ready code.
- **`develop`**: Integration branch for new features.
- **`feature/name`**: Individual feature work.

## 🧪 Testing

We use Vitest for unit testing and Playwright for E2E tests.
- Run all tests: `npm test`.
- Run only agent tests: `npm run test:agent`.

## 📜 Coding Standards

- **ESM**: We use ES Modules exclusively. No `require()`.
- **Prettier**: Ensure your code is formatted with our Prettier config.
- **Documentation**: If you add a new feature, please update the relevant `.md` file in `docs/wiki/`.

## 🚢 Submitting a Pull Request

1.  Create a branch for your fix/feature.
2.  Add tests for your changes.
3.  Ensure all existing tests pass.
4.  Open a PR against the `develop` branch.
5.  Provide a clear description of what changed and why.

## 🛑 Non-Commercial Philosophy

LocalDom is dedicated to the community. We strictly adhere to a non-commercial philosophy:
- This project will always be free and open-source.
- We do not accept contributions that add "paid tiers" or restrictive licensing.

---

## ⏭️ Read More
- [**Architecture**](Architecture) — Deep dive into the codebase.
- [**CLI Reference**](CLI-Reference) — Available scripts for development.
