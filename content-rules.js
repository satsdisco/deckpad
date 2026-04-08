'use strict';

function normalize(value) {
  return String(value || '').trim().toLowerCase();
}

const PLACEHOLDER_EXACT = new Set([
  'asd',
  'asdf',
  'asdasd',
  'asdasdasd',
  'dsfsdf',
  'test',
  'test project',
  'demo project',
]);

const PLACEHOLDER_PATTERN = /^(?:asd|asdf|qwe|qwerty|zxc|zxcv|sdf|fdsa|dsf){1,4}$/i;
const BLOCKED_COMMENT_PATTERNS = [
  /\bnigg(?:er|a|ers|as)\b/i,
  /\bfagg(?:ot|ots|otry|y)\b/i,
  /\bretard(?:ed)?\b/i,
  /\bkike\b/i,
  /\bspic\b/i,
  /\bchink\b/i,
];

function isPlaceholderText(value) {
  const text = normalize(value);
  if (!text) return false;
  return PLACEHOLDER_EXACT.has(text) || PLACEHOLDER_PATTERN.test(text);
}

function isPlaceholderProject(project) {
  if (!project) return false;
  return isPlaceholderText(project.name) || isPlaceholderText(project.description);
}

function isPlaceholderIdea(idea) {
  if (!idea) return false;
  return isPlaceholderText(idea.title) || isPlaceholderText(idea.description);
}

function hasBlockedCommentContent(content) {
  const text = normalize(content);
  if (!text) return false;
  return BLOCKED_COMMENT_PATTERNS.some((pattern) => pattern.test(text));
}

function shouldHideComment(comment) {
  if (!comment) return false;
  return hasBlockedCommentContent(comment.content) || isPlaceholderText(comment.content);
}

function filterPublicProjects(rows) {
  return (Array.isArray(rows) ? rows : []).filter((row) => !isPlaceholderProject(row));
}

function filterPublicIdeas(rows) {
  return (Array.isArray(rows) ? rows : []).filter((row) => !isPlaceholderIdea(row));
}

function filterPublicComments(rows) {
  return (Array.isArray(rows) ? rows : []).filter((row) => !shouldHideComment(row));
}

module.exports = {
  filterPublicComments,
  filterPublicIdeas,
  filterPublicProjects,
  hasBlockedCommentContent,
  isPlaceholderIdea,
  isPlaceholderProject,
  isPlaceholderText,
  shouldHideComment,
};
