import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

const DotsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: ${props => props.theme.spacing.sm};
  margin-top: ${props => props.theme.spacing.lg};
`;

const Dot = styled(motion.button)`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid ${props => props.theme.colors.primary};
  background-color: ${props =>
    props.active ? props.theme.colors.primary : 'transparent'};
  cursor: pointer;
  padding: 0;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.2);
    background-color: ${props => props.theme.colors.primary}80;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px ${props => props.theme.colors.primary}40;
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    width: 10px;
    height: 10px;
  }
`;

const ProgressDots = ({ total, current, onChange }) => {
  return (
    <DotsContainer>
      {Array.from({ length: total }, (_, index) => (
        <Dot
          key={index}
          active={index === current}
          onClick={() => onChange(index)}
          aria-label={`Aller au témoignage ${index + 1}`}
          whileTap={{ scale: 0.9 }}
          animate={{
            scale: index === current ? 1.1 : 1,
          }}
        />
      ))}
    </DotsContainer>
  );
};

ProgressDots.propTypes = {
  total: PropTypes.number.isRequired,
  current: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default ProgressDots;
