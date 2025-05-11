import {cn} from '@/lib/utils';
import {memo} from 'react';
import Markdown from 'react-markdown';

/**
 *
 * @param {Readonly<import('react-markdown').Options>} props
 */
const MarkdownRender = ({className, ...props}) => {
  return (
    <div
      id="markdown-renderer"
      className={cn(
        'prose prose-a:text-primary prose-ol:!list-decimal prose-ol:font-bold prose-ul:!list-disc',
        className,
      )}>
      <Markdown
        components={{
          a: ({node, ...props}) => (
            <a target="_blank" rel="noopener noreferrer" {...props} />
          ),
        }}
        {...props}>
        {String(props.children)}
      </Markdown>
    </div>
  );
};

export default memo(MarkdownRender);
