name:= clipboard-editor

pack-win:
	electron-packager ./ $(name) --platform=win32 --arch=x64 --out ../package --overwrite
pack-linux:
	electron-packager ./ $(name) --platform=linux --arch=x64 --out ../package --overwrite
pack-mac:
	electron-packager ./ $(name) --platform=darwin --arch=x64 --out ../package --overwrite