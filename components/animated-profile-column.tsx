import { motion } from "framer-motion";
import Image from "next/image";

interface AnimatedProfileColumnProps {
	images: string[];
	initialY: string;
	isAnimationPaused: boolean;
}

export const AnimatedProfileColumn = ({
	images,
	initialY,
	isAnimationPaused,
}: AnimatedProfileColumnProps) => {
	const scrollVariants = {
		animate: {
			y: ["0%", "-50%"],
			transition: {
				y: {
					repeat: Number.POSITIVE_INFINITY,
					repeatType: "loop" as const,
					duration: 10,
					ease: "linear" as const,
				},
			},
		},
		paused: {
			y: ["0%", "-50%"],
			transition: {
				y: {
					repeat: Number.POSITIVE_INFINITY,
					repeatType: "loop" as const,
					duration: 10,
					ease: "linear" as const,
				},
			},
		},
	};

	return (
		<div className="relative h-full overflow-hidden">
			<motion.div
				className="flex flex-col gap-4"
				variants={scrollVariants}
				animate={isAnimationPaused ? "paused" : "animate"}
				initial={{ y: initialY }}
				style={{ animationPlayState: isAnimationPaused ? "paused" : "running" }}
			>
				{images.map((src, index) => (
					<Image
						key={index}
						src={src || "/placeholder.svg"}
						alt="Mentor portrait"
						width={150}
						height={220}
						className="rounded-full object-cover h-[320px] flex-shrink-0 shadow-lg"
					/>
				))}
			</motion.div>
		</div>
	);
};
