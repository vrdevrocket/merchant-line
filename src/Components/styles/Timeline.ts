import styled from 'styled-components';

export const StyledTimeline = styled.div`
  position: relative;
  &::before {
    position: absolute;
    top: 6px;
    width: 4px;
    height: 100%;
    content: '';
    background-color: #e6e6e6;
    left: 4px;
    @media (min-width: ${props => props.theme.breakPoints.breakMobileMedium}) {
      left: 50%;
      margin-left: -2px;
    }
  }

  .icon {
    position: absolute;
    top: 6px;
    left: 0;
    width: 28px;
    height: 4px;
    border-radius: 4px;
    background-color: #e6e6e6;
    @media (min-width: ${props => props.theme.breakPoints.breakMobileMedium}) {
      left: 50%;
      margin-left: -6px;
    }
  }
  .icon-even {
    margin-left: -26px;
    @media (max-width: ${props => props.theme.breakPoints.breakMobileMedium}) {
      margin-left: 0;
    }
  }
  .icon-odd {
    margin-left: -2px;
    @media (max-width: ${props => props.theme.breakPoints.breakMobileMedium}) {
      margin-left: 0;
    }
  }
  .content {
    position: relative;
    margin-left: 1rem;
    @media (min-width: ${props => props.theme.breakPoints.breakMobileMedium}) {
      width: 47%;
      margin-left: 0;
    }
    @media (max-width: ${props => props.theme.breakPoints.breakMobileMedium}) {
      margin-left: 30px;
    }
  }
  .content.right,
  .body.right {
    @media (min-width: ${props => props.theme.breakPoints.breakMobileMedium}) {
      float: right;
    }
    @media (max-width: ${props => props.theme.breakPoints.breakMobileMedium}) {
      float: left;
    }
  }
  .content.left,
  .content.left {
    @media (min-width: ${props => props.theme.breakPoints.breakMobileMedium}) {
      float: left;
    }
    @media (max-width: ${props => props.theme.breakPoints.breakMobileMedium}) {
      float: left;
    }
  }
  .body {
    float: left;
    margin: 0;
    @media (max-width: ${props => props.theme.breakPoints.breakMobileMedium}) {
      float: left;
      margin-bottom: 0;
    }
  }

  .date {
    display: inline-block;
    width: 47%;
    @media (min-width: ${props => props.theme.breakPoints.breakMobileMedium}) {
      position: absolute;
      top: 0;
    }
    @media (max-width: ${props => props.theme.breakPoints.breakMobileMedium}) {
      position: relative;
      top: 0;
      width: 100%;
      left: 30px;
    }
  }
  .date-even {
    @media (min-width: ${props => props.theme.breakPoints.breakMobileMedium}) {
      padding-left: 42px;
      left: 50%;
    }
  }
  .date-odd {
    @media (min-width: ${props => props.theme.breakPoints.breakMobileMedium}) {
      padding-right: 42px;
      text-align: right;
      right: 50%;
    }
  }
`;
