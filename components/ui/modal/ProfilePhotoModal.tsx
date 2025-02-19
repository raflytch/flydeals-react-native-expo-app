import { View, Modal, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface ProfilePhotoModalProps {
  isVisible: boolean;
  onClose: () => void;
  photoUrl: string;
}

const ProfilePhotoModal = ({
  isVisible,
  onClose,
  photoUrl,
}: ProfilePhotoModalProps) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-black/80 justify-center items-center">
        <TouchableOpacity
          onPress={onClose}
          className="absolute top-10 right-6 z-10"
        >
          <Ionicons name="close-circle" size={32} color="white" />
        </TouchableOpacity>
        <View className="w-72 h-72 rounded-full overflow-hidden border-4 border-white/20">
          <Image
            source={{ uri: photoUrl }}
            className="w-full h-full"
            resizeMode="cover"
          />
        </View>
      </View>
    </Modal>
  );
};

export default ProfilePhotoModal;
