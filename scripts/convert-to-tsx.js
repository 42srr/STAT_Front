import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const srcDir = path.join(__dirname, "../src");

// TypeScript 선언을 위한 템플릿
const reactImportLine = "import React from 'react';\n";
const reactFCTemplate = (componentName) =>
  `const ${componentName}: React.FC = `;

// 재귀적으로 JSX 파일을 찾고 TSX로 변환
function convertJsxToTsx(dir) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stats = fs.statSync(filePath);

    if (stats.isDirectory()) {
      convertJsxToTsx(filePath); // 하위 디렉토리 재귀 탐색
    } else if (file.endsWith(".jsx")) {
      const newPath = filePath.replace(".jsx", ".tsx");
      const content = fs.readFileSync(filePath, "utf8");

      // 파일 내용 분석하여 React 컴포넌트 탐색
      let newContent = content;

      // React import가 없으면 추가
      if (!newContent.includes("import React")) {
        const firstImportLine = newContent.indexOf("import");
        if (firstImportLine !== -1) {
          const importEndLine = newContent.indexOf("\n", firstImportLine) + 1;
          newContent =
            newContent.slice(0, importEndLine) +
            reactImportLine +
            newContent.slice(importEndLine);
        } else {
          newContent = reactImportLine + newContent;
        }
      }

      // 함수형 컴포넌트를 React.FC 타입으로 변환
      const functionComponentRegex = /function\s+([A-Za-z0-9_]+)\s*\(/g;
      const arrowComponentRegex =
        /const\s+([A-Za-z0-9_]+)\s*=\s*\([^)]*\)\s*=>/g;

      // 함수 선언식 컴포넌트 변환
      newContent = newContent.replace(functionComponentRegex, (match, name) => {
        return `function ${name}: React.FC<any> (`;
      });

      // 화살표 함수 컴포넌트 변환
      newContent = newContent.replace(arrowComponentRegex, (match, name) => {
        return `const ${name}: React.FC<any> = (`;
      });

      // 이미지 임포트에 ts-ignore 추가
      newContent = newContent.replace(
        /(import\s+\w+\s+from\s+['"].*\.(svg|png|jpg|jpeg|gif)['"])/g,
        "// @ts-ignore\n$1"
      );

      // jsx 확장자 import 문을 수정
      newContent = newContent.replace(/from\s+['"](.+)\.jsx['"]/g, 'from "$1"');

      // 변환된 내용으로 새 파일 생성
      fs.writeFileSync(newPath, newContent);
      console.log(`Converted: ${filePath} -> ${newPath}`);

      // 원본 JSX 파일 삭제
      fs.unlinkSync(filePath);
      console.log(`Deleted original: ${filePath}`);
    }
  }
}

// 변환 시작
console.log("Starting JSX to TSX conversion...");
convertJsxToTsx(srcDir);
console.log("Conversion complete!");
