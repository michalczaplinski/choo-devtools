all: build

build:
	mkdir -p extension_build/dist
	cp dist/bundle.js extension_build/dist/bundle.js
	cp -r scripts/* extension_build/scripts
	cp html/* extension_build/html
	cp manifest.json extension_build/manifest.json
	crx pack extension_build --zip-output extension_build/choo-devtools.zip
	rm choo-devtools.crx
