import styled from 'styled-components';

export const AdminContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background-color: var(--bg);
  color: var(--text);
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid var(--surface-border);
`;

export const SelectedRowStyles = `
  background-color: var(--surface-hover-bg);
  border-left: 3px solid var(--accent);
`;

export const TabContainer = styled.div`
  display: flex;
  margin-bottom: 20px;
  border-bottom: 1px solid var(--surface-border);
`;

export const Tab = styled.button<{ $active: boolean }>`
  padding: 10px 20px;
  background: transparent;
  border: none;
  border-bottom: 2px solid ${props => props.$active ? 'var(--accent)' : 'transparent'};
  color: ${props => props.$active ? 'var(--accent)' : 'var(--text)'};
  cursor: pointer;
  font-weight: ${props => props.$active ? 'bold' : 'normal'};
  margin-right: 10px;
  transition: all 0.2s;
  
  &:hover {
    color: var(--accent);
  }
  
  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px var(--focus-ring);
    border-radius: 4px;
  }
`;

export const Panel = styled.div`
  padding: 20px;
  background-color: var(--surface-bg);
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  border: 1px solid var(--surface-border);
  
  &:hover {
    background-color: var(--surface-hover-bg);
  }
`;

export const FormGroup = styled.div`
  margin-bottom: 15px;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: var(--text);
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid var(--surface-border);
  border-radius: 4px;
  font-size: 16px;
  background-color: var(--surface-bg);
  color: var(--text);
  
  &:focus {
    outline: none;
    border-color: var(--accent);
    box-shadow: 0 0 0 3px var(--focus-ring);
  }
  
  &:hover {
    border-color: var(--accent);
  }
`;

export const Button = styled.button`
  background-color: var(--btn-bg);
  color: var(--btn-text);
  border: 2px solid var(--btn-border);
  padding: 10px 15px;
  border-radius: 10px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease, transform 0.1s ease;
  
  &:hover {
    background-color: var(--btn-hover-bg);
    border-color: var(--btn-hover-border);
    transform: translateY(-1px);
  }
  
  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px var(--focus-ring);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

// Keep DeleteButton with red styling for clear destructive action
export const DeleteButton = styled(Button)`
  background-color: #f56565;
  color: white;
  border-color: #e53e3e;
  
  &:hover {
    background-color: #e53e3e;
    border-color: #c53030;
  }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  
  th, td {
    padding: 12px 15px;
    border-bottom: 1px solid var(--surface-border);
    text-align: left;
  }
  
  th {
    background-color: var(--surface-bg);
    font-weight: bold;
    color: var(--text);
  }
  
  tr {
    transition: background-color 0.2s ease;
  }
  
  tr:hover {
    background-color: var(--surface-hover-bg);
  }
`;

// Status badges maintain their semantic colors
export const Badge = styled.span<{ type: 'pending' | 'approved' | 'rejected' }>`
  display: inline-block;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  
  ${props => {
    switch (props.type) {
      case 'pending':
        return 'background-color: #fef3c7; color: #92400e;';
      case 'approved':
        return 'background-color: #d1fae5; color: #065f46;';
      case 'rejected':
        return 'background-color: #fee2e2; color: #b91c1c;';
      default:
        return '';
    }
  }}
`;

export const ErrorMessage = styled.div`
  color: #e53e3e;
  padding: 10px;
  margin-bottom: 15px;
  background-color: #fee2e2;
  border-radius: 4px;
`;

// Add a theme-aware TextArea component
export const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  border: 1px solid var(--surface-border);
  border-radius: 4px;
  font-size: 16px;
  background-color: var(--surface-bg);
  color: var(--text);
  
  &:focus {
    outline: none;
    border-color: var(--accent);
    box-shadow: 0 0 0 3px var(--focus-ring);
  }
  
  &:hover {
    border-color: var(--accent);
  }
`;

// Card component for dashboard stats
export const StatsCard = styled.div`
  padding: 20px;
  background-color: var(--surface-bg);
  border-radius: 8px;
  text-align: center;
  border: 1px solid var(--surface-border);
  transition: transform 0.2s ease, border-color 0.2s ease;
  
  &:hover {
    border-color: var(--accent);
    transform: translateY(-2px);
  }
  
  h3 {
    margin-bottom: 10px;
    color: var(--text);
  }
  
  p {
    font-size: 32px;
    font-weight: bold;
    color: var(--accent);
    margin: 0;
  }
`;

export function slugify(s: string) {
  return s
    .toLowerCase()
    .trim()
    .replace(/[\s\W-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}