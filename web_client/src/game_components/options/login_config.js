import VisualizerConfig from 'game_components/options/visualizer_config';
import LogoConfig from 'game_components/options/logo_config';

/**
 * LoginScene config 상태 값.
 * @type {{}}
 */
export default {

  /**
   * background visualizer
   */
  Visualizer : VisualizerConfig.Visualizer01[0],


  /**
   * background logo type
   */
  LogoType : LogoConfig.Logo01,


  /**
   * Logo text
   */
  LogoText : 'DJ TECHNICIAN',


  /**
   * Logo Position
   */
  LogoPosition : {
    x : -2000,
    y : 100,
    z : 0
  }

}