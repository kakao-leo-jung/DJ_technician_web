import Visualizer01 from 'game_components/manager/objects/visualizer/visualizer01';
import Logo01 from 'game_components/manager/objects/logo/logo01';


/**
 * LoginScene의 백그라운드 매니징.
 * @param sceneManager
 * @param config
 */
const setLoginBackground = async (sceneManager, config) => {

  const visualizer = Visualizer01.createVisualizer01(config.Visualizer);
  sceneManager.addObjectModule(visualizer);

  const mainLogo = await Logo01.createLogo01(getSetupLogoConfig(config, config.LogoType));
  sceneManager.addObjectModule(mainLogo);

}


/**
 *
 * @param loginConfig
 * @param logoConfig
 */
const getSetupLogoConfig = (loginConfig, logoConfig) => {
  logoConfig.text = loginConfig.LogoText;
  logoConfig.position = loginConfig.LogoPosition;
  return logoConfig;
};

export {setLoginBackground}