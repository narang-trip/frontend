import useNativeLazyLoading from '@charlietango/use-native-lazy-loading';
import { useInView } from 'react-intersection-observer';

const PracticePage = () => {
  const height = "700px";
  const width = "700px";
  const supportsLazyLoading = useNativeLazyLoading();
  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: '0px 0px',
    skip: supportsLazyLoading !== false,
  });

  return (
    <div
      ref={ref}
      style={{
        position: 'relative',
        paddingBottom: `${(height / width) * 100}%`,
        background: '#2a4b7a',
      }}
    >
      33
      {inView || supportsLazyLoading ? (
        <img
          src={"assets/travel1.jpg"}
          width={width}
          height={height}
          loading="lazy"
          style={{ position: 'absolute', width: '100%', height: '100%' }}
        />
      ) : null}
    </div>
  );
};

export default PracticePage;