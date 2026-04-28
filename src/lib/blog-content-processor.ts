/**
 * Blog content processor to clean duplicate content and improve formatting
 */

export function processBlogContent(content: string): string {
  // Split content into sections
  let processedContent = content;

  // Remove duplicate sections that follow the pattern of having both Key Takeaways and Conclusion
  processedContent = removeDuplicateEndSections(processedContent);

  // Improve formatting and readability
  processedContent = improveContentFormatting(processedContent);

  return processedContent;
}

function removeDuplicateEndSections(content: string): string {
  // Split by horizontal rules to identify sections
  const sections = content.split(/\n---\n/);
  
  let processedSections = [...sections];
  let keyTakeawaysIndex = -1;
  let conclusionIndex = -1;

  // Find Key Takeaways and Conclusion sections
  sections.forEach((section, index) => {
    const trimmedSection = section.trim();
    if (trimmedSection.startsWith('## Key Takeaways')) {
      keyTakeawaysIndex = index;
    }
    if (trimmedSection.startsWith('## Conclusion')) {
      conclusionIndex = index;
    }
  });

  // If both sections exist, merge them intelligently
  if (keyTakeawaysIndex !== -1 && conclusionIndex !== -1) {
    const keyTakeawaysContent = sections[keyTakeawaysIndex];
    const conclusionContent = sections[conclusionIndex];

    // Extract bullet points from Key Takeaways
    const bulletPoints = extractBulletPoints(keyTakeawaysContent);
    
    // Create a combined conclusion that includes the takeaways as highlights
    const combinedConclusion = createCombinedConclusion(conclusionContent, bulletPoints);

    // Remove the separate Key Takeaways section and replace Conclusion
    processedSections.splice(keyTakeawaysIndex, 1);
    
    // Adjust conclusion index if needed
    const adjustedConclusionIndex = conclusionIndex > keyTakeawaysIndex ? conclusionIndex - 1 : conclusionIndex;
    processedSections[adjustedConclusionIndex] = combinedConclusion;
  }

  return processedSections.join('\n---\n');
}

function extractBulletPoints(keyTakeawaysContent: string): string[] {
  const lines = keyTakeawaysContent.split('\n');
  const bulletPoints: string[] = [];

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith('- **') && trimmed.includes('**')) {
      // Extract the main point from the bold text
      const match = trimmed.match(/- \*\*([^*]+)\*\*/);
      if (match) {
        bulletPoints.push(match[1]);
      }
    }
  }

  return bulletPoints;
}

function createCombinedConclusion(conclusionContent: string, keyPoints: string[]): string {
  const lines = conclusionContent.split('\n');
  
  // Find the conclusion title line
  const titleLineIndex = lines.findIndex(line => line.trim().startsWith('## Conclusion'));
  
  if (titleLineIndex === -1) return conclusionContent;

  // Insert key highlights after the title
  const beforeTitle = lines.slice(0, titleLineIndex + 1);
  const afterTitle = lines.slice(titleLineIndex + 1);

  const keyHighlights = keyPoints.length > 0 ? [
    '',
    '### Key Insights',
    '',
    ...keyPoints.map(point => `- **${point}**`),
    ''
  ] : [];

  return [...beforeTitle, ...keyHighlights, ...afterTitle].join('\n');
}

function improveContentFormatting(content: string): string {
  let improved = content;

  // Add better spacing around headers
  improved = improved.replace(/([^\n])\n(## [^\n]+)/g, '$1\n\n$2');
  improved = improved.replace(/(## [^\n]+)\n([^\n])/g, '$1\n\n$2');

  // Improve emphasis formatting
  improved = improved.replace(/\*\*([^*]+)\*\*:/g, '**$1:**');

  // Clean up excessive blank lines
  improved = improved.replace(/\n\n\n+/g, '\n\n');

  // Ensure proper spacing around lists
  improved = improved.replace(/([^\n])\n(- [^\n]+)/g, '$1\n\n$2');
  improved = improved.replace(/([^\n])\n(\d+\. [^\n]+)/g, '$1\n\n$2');

  return improved.trim();
}