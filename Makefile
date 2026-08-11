.PHONY: install build

install:
	pnpm install --frozen-lockfile

build:
	pnpm run build

lint:
	pnpm --silent run lint
	pnpm --silent run format:check
