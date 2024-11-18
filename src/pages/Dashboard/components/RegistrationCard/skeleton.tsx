import styled from "styled-components";

interface SkeletonLineProps {
  height?: string;
  width?: string;
}

const SkeletonCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  border: 4px solid #fff;
  margin: 16px;
  border-radius: 8px;
  padding: 16px;
  background-color: #fff;
`;

const SkeletonLine = styled.div<SkeletonLineProps>`
  height: ${(props) => props.height || "16px"};
  background-color: #e0e0e0;
  border-radius: 4px;
  width: ${(props) => props.width || "100%"};
  animation: pulse 1.5s infinite;

  @keyframes pulse {
    0% {
      background-color: #e0e0e0;
    }
    50% {
      background-color: #d4d4d4;
    }
    100% {
      background-color: #e0e0e0;
    }
  }
`;

const SkeletonActions = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const SkeletonIconAndText = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const SkeletonCircle = styled.div`
  width: 20px;
  height: 20px;
  background-color: #e0e0e0;
  border-radius: 50%;
  animation: pulse 1.5s infinite;
`;

const RegistrationCardSkeleton = () => {
  return (
    <SkeletonCard>

      <SkeletonIconAndText>
        <SkeletonCircle />
        <SkeletonLine width="60%" />
      </SkeletonIconAndText>

      <SkeletonIconAndText>
        <SkeletonCircle />
        <SkeletonLine width="80%" />
      </SkeletonIconAndText>

      <SkeletonIconAndText>
        <SkeletonCircle />
        <SkeletonLine width="50%" />
      </SkeletonIconAndText>

      <SkeletonActions>
        <SkeletonLine width="40%" height="32px" />
        <SkeletonLine width="40%" height="32px" />
        <SkeletonCircle />
      </SkeletonActions>
    </SkeletonCard>
  );
};

export default RegistrationCardSkeleton;
