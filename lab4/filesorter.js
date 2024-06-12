const fs = require("fs");
const path = require("path");

function moveFile(sourcePath, destinationPath) {
  fs.renameSync(sourcePath, destinationPath);
}

function createDirectory(directoryPath) {
  if (!fs.existsSync(directoryPath)) {
    fs.mkdirSync(directoryPath, { recursive: true });
  }
}

function getFileExtension(fileName) {
  return path.extname(fileName).toLowerCase();
}

function transformVideoFileName(fileName) {
  const transformations = [
    { regex: /(\.|\b)([A-Za-z]+)/g, replacement: " $2" },
    { regex: /\.[A-Za-z]{3}$/, replacement: "" },
    { regex: /\.\d{4}\./, replacement: " [$&]" },
  ];

  let transformedFileName = fileName;
  for (const transformation of transformations) {
    transformedFileName = transformedFileName.replace(
      transformation.regex,
      transformation.replacement
    );
  }

  return transformedFileName.trim() + ".avi";
}

function processAudioFile(filePath, outputRoot) {
  const fileName = path.basename(filePath);
  const fileExtension = getFileExtension(fileName);

  let destinationFolder = "";

  if (fileExtension === ".mp3") {
    const parentDirectory = path.dirname(filePath);
    if (parentDirectory !== inputRoot) {
      const parentFolderName = path.basename(parentDirectory);
      destinationFolder = path.join(
        outputRoot,
        "music",
        "mp3",
        parentFolderName
      );
      createDirectory(destinationFolder);

      moveFile(
        filePath,
        path.join(destinationFolder, parentFolderName + "-" + fileName)
      );
      return;
    }
  }

  if (fileExtension === ".mp3") {
    destinationFolder = path.join(outputRoot, "music", "mp3");
  } else if ([".flac", ".ape", ".cue", ".wav"].includes(fileExtension)) {
    destinationFolder = path.join(outputRoot, "music", "lossless");
  }

  createDirectory(destinationFolder);
  moveFile(filePath, path.join(destinationFolder, fileName));
}

function processVideoFile(filePath, outputRoot) {
  const fileName = path.basename(filePath);

  const transformedFileName = transformVideoFileName(fileName);

  const destinationFolder = path.join(outputRoot, "films");
  createDirectory(destinationFolder);
  moveFile(filePath, path.join(destinationFolder, transformedFileName));
}

function processImageFile(filePath, outputRoot) {
  const fileName = path.basename(filePath);
  const parentDirectory = path.dirname(filePath);

  let destinationFolder = "";

  if (parentDirectory !== inputRoot) {
    const parentFolderName = path.basename(parentDirectory);
    destinationFolder = path.join(outputRoot, "images", parentFolderName);
    createDirectory(destinationFolder);
    moveFile(
      filePath,
      path.join(destinationFolder, parentFolderName + "-" + fileName)
    );
    return;
  }

  destinationFolder = path.join(outputRoot, "images", "to_sort");
  createDirectory(destinationFolder);
  moveFile(filePath, path.join(destinationFolder, fileName));
}

function processOtherFile(filePath, outputRoot) {
  const fileName = path.basename(filePath);
  const parentDirectory = path.dirname(filePath);

  let destinationFolder = "";

  if (parentDirectory !== inputRoot) {
    const parentFolderName = path.basename(parentDirectory);
    destinationFolder = path.join(outputRoot, "other", parentFolderName);
    createDirectory(destinationFolder);
    moveFile(filePath, path.join(destinationFolder, fileName));
    return;
  }

  destinationFolder = path.join(outputRoot, "other");
  createDirectory(destinationFolder);
  moveFile(filePath, path.join(destinationFolder, fileName));
}

function readdirSyncRecursive(directoryPath) {
  let fileNames = [];
  const files = fs.readdirSync(directoryPath);

  for (const file of files) {
    const filePath = path.join(directoryPath, file);
    const stat = fs.statSync(filePath);

    if (stat.isFile()) {
      fileNames.push(filePath);
    } else if (stat.isDirectory()) {
      fileNames = fileNames.concat(readdirSyncRecursive(filePath));
    }
  }

  return fileNames;
}

function sortFiles(inputRoot, outputRoot) {
  const files = readdirSyncRecursive(inputRoot);
  console.log(files);
  for (const file of files) {
    if (fs.statSync(file).isFile()) {
      const fileExtension = getFileExtension(file);
      if ([".mp3", ".flac", ".ape", ".cue", ".wav"].includes(fileExtension)) {
        processAudioFile(file, outputRoot);
      } else if ([".avi", ".mp4", ".mkv"].includes(fileExtension)) {
        processVideoFile(file, outputRoot);
      } else if ([".png", ".jpg", ".jpeg", ".gif"].includes(fileExtension)) {
        processImageFile(file, outputRoot);
      } else {
        processOtherFile(file, outputRoot);
      }
    }
  }
}

const inputRoot =
  "./input_root";
const outputRoot =
  "./output_root";
sortFiles(inputRoot, outputRoot);