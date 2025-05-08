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
      className={cn(
        'prose prose-ol:!list-decimal prose-ul:!list-disc prose-a:text-primary prose-ol:font-bold',
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
