.PHONY: install build

install:
	pnpm install --frozen-lockfile

build:
	pnpm run build
