all: build

build:
	cp -r scripts/* dist/scripts
	cp html/* dist/html
	cp manifest.json dist/manifest.json
	mkdir -p extension_build
	crx pack dist --zip-output extension_build/choo-devtools.zip
	mv choo-devtools.crx extension_build
